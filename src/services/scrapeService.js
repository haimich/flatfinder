'use strict';

let Promise = require('bluebird');
let mailService = require('./mailService');
let offersRepo = require('../repos/offersRepo');
let companyRepo = require('../repos/companyRepo');
let templateService = require('./templateService');

let adapters = [
  require('../adapters/aniseustachi'),
  require('../adapters/avallone'),
  require('../adapters/artekt'),
  require('../adapters/baar'),
  require('../adapters/besserwohnen'),
  require('../adapters/blumenwinkel'),
  require('../adapters/can'),
  require('../adapters/cuffaro'),
  require('../adapters/engelvoelkers'),
  require('../adapters/ewg'),
  require('../adapters/forum'),
  require('../adapters/gebaka'),
  require('../adapters/gig'),
  require('../adapters/goebelbecker'),
  require('../adapters/haitz'),
  require('../adapters/heck'),
  require('../adapters/helblerichter'),
  require('../adapters/hustherbold'),
  require('../adapters/immoka'),
  require('../adapters/immotrend'),
  require('../adapters/immowenk'),
  require('../adapters/kassel'),
  require('../adapters/km'),
  require('../adapters/koch-rheinstetten'),
  require('../adapters/kuehn'),
  require('../adapters/laub'),
  require('../adapters/leitgieb'),
  require('../adapters/neubaukompass'),
  require('../adapters/pellrich'),
  require('../adapters/pferrer'),
  // require('../adapters/postbank'), broken
  require('../adapters/seegerrusswurm'),
  require('../adapters/sekundus'),
  require('../adapters/spaka'), 
  require('../adapters/spaka_haeuser'),
  require('../adapters/speck'),
  require('../adapters/suw'),
  require('../adapters/throm'),
  require('../adapters/volkswohnung'),
  require('../adapters/weisenburger'),
  require('../adapters/weststadtmakler'),
  require('../adapters/wipfler'),
];

module.exports.scrapeAll = () => {
  let errorList = [];
  
  return Promise.map(adapters, adapter => {
    return adapter.scrape()
      .catch(error => {
        errorList.push(`${error.message} (${error.options.uri})`);
        return [];
      });
  }).then(flatResponses => {
      return Promise.map(flatResponses, flats => {
        return Promise.map(flats, checkOfferExists);
      });
    })
    .then(flatResponses => {
      return Promise.map(flatResponses, flats => {
        return Promise.map(flats, insertIfNew);
      });
    })
    .then(flatResponses => {
      console.log('Scraping done', flatResponses);
      
      if (hasNewEntries(flatResponses)) {
        companyRepo.getCompanies()
          .then(companies => {
            let emptyEntries = getEmptyEntries(flatResponses);
            let companyNames = getCompanyNames(companies);
            let data = {
              flatResponses,
              companyNames,
              emptyEntries,
              errorList
            };
            let text = templateService.compileTemplate(templateService.TEMPLATE_NAMES.OFFERS, data);
            
            mailService.sendMail(
              'Flatfinder found new offers',
              text
            );
          });
      } else {
        console.log('No new entries.');
        console.error('Errors:', errorList)
      }
    })
    .catch(error => {
      mailService.sendMail(
        'Flatfinder had a hickup',
        JSON.stringify(error.stack)
      );
      
      throw error;
    });
}

function checkOfferExists(flat) {
  return offersRepo.offerExists(flat.companyId, flat.title, flat.url)
    .then(offerExists => {
      flat.exists = offerExists;
      return flat;
    });
}

function insertIfNew(flat) {
  if (flat.exists) {
    return flat;
  }
  return offersRepo.insertOffer(flat.companyId, flat.title, flat.url)
    .then(() => flat);
}

function getEmptyEntries(flatResponses) {
  let emptyEntries = 0;
  for (let flats of flatResponses) {
    if (flats.length === 0) {
      emptyEntries += 1;
    }
  }
  return emptyEntries;
}

function hasNewEntries(flatResponses) {
  for (let flats of flatResponses) {
    for (let flat of flats) {
      if (!flat.exists) {
        return true;
      }
    }
  }
  return false;
}

function getCompanyNames(companies) {
  let companyNames = {};
  for (let comp of companies) {
    companyNames[comp.id] = comp.name;
  }
  return companyNames;
}