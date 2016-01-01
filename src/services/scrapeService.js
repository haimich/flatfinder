'use strict';

let Promise = require('bluebird');
let mailService = require('./mailService');
let offersService = require('./offersService');
let companyService = require('./companyService');

let adapters = [
  require('../adapters/km'),
  require('../adapters/weisenburger'),
  require('../adapters/cuffaro'),
  require('../adapters/throm'),
  require('../adapters/kassel'),
  require('../adapters/artekt'),
  require('../adapters/goebelbecker'),
  require('../adapters/helblerichter'),
  require('../adapters/volkswohnung'),
  require('../adapters/immoka'),
  require('../adapters/spaka'),
  require('../adapters/spaka_haeuser'),
  require('../adapters/weststadtmakler'),
  require('../adapters/immotrend'),
  require('../adapters/gebaka'),
  require('../adapters/gig'),
  require('../adapters/besserwohnen'),
  require('../adapters/haitz'),
  require('../adapters/suw'),
  require('../adapters/laub'),
  require('../adapters/blumenwinkel'),
  require('../adapters/neubaukompass'),
  require('../adapters/baar'),
  require('../adapters/ewg'),
  require('../adapters/forum'),
  require('../adapters/wipfler'),
];

module.exports.scrapeAll = () => {
  return Promise.map(adapters, adapter => adapter.scrape())
    .then((flatResponses) => {
      return Promise.map(flatResponses, (flats) => {
        return Promise.map(flats, checkOfferExists);
      });
    })
    .then((flatResponses) => {
      return Promise.map(flatResponses, (flats) => {
        return Promise.map(flats, insertIfNew);
      });
    })
    .then((flatResponses) => {
      console.log('Scraping done');
      
      if (hasNewEntries(flatResponses)) {
        companyService.getCompanies()
          .then(companies => {
            let emptyEntries = getEmptyEntries(flatResponses);
            
            mailService.sendMail(
              'Flatfinder found new offers',
              prepareMailText(flatResponses, companies, emptyEntries)
            );
          });
      } else {
        console.log('No new entries');
      }
    })
    .catch((err) => {
      mailService.sendMail(
        'Flatfinder had a hickup',
        JSON.stringify(err.stack)
      );
      
      throw err;
    });
}

function checkOfferExists(flat) {
  return offersService.offerExists(flat.companyId, flat.title, flat.url)
    .then(offerExists => {
      flat.exists = offerExists;
      return flat;
    });
}

function insertIfNew(flat) {
  if (flat.exists) {
    return flat;
  }
  return offersService.insertOffer(flat.companyId, flat.title, flat.url)
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

function prepareMailText(flatResponses, companies, emptyEntries) {
  let text = '';
  let companyNames = getCompanyNames(companies);
  
  for (let flats of flatResponses) {
    
    flats.forEach((flat, index) => {
      if (!flat.exists) {
        if (index === 0) {
          // add single header for multiple flats of same company
          text += `<h2>${companyNames[flat.companyId]}</h2><ul>`;
        }
        
        text += `<li><a href="${flat.url}">${flat.title}</a></li>`;
        
        if (index === flats.length - 1) {
          text += `</ul>`;
        }
      }
    });
    
    text += '<br />';
  }
  
  text += '<h3>Services without flats: </h3>' + emptyEntries;
  
  return text;
}

function getCompanyNames(companies) {
  let companyNames = {};
  for (let comp of companies) {
    companyNames[comp.id] = comp.name;
  }
  return companyNames;
}