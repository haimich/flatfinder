'use strict';

let Promise = require('bluebird');
let mailService = require('./mailService');
let offersService = require('./offersService');
let companyService = require('./companyService');

let adapters = [
  require('../adapters/km'),
  require('../adapters/weisenburger'),
  require('../adapters/cuffaro'),
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
      if (hasNewEntries(flatResponses)) {
        companyService.getCompanies()
          .then((companies) => {
            mailService.sendMail(
              'Flatfinder found new offers',
              prepareMailText(flatResponses, companies)
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
  return offersService.offerExists(flat.companyId, flat.title)
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

function prepareMailText(flatResponses, companies) {
  let text = '';
  
  for (let flats of flatResponses) {
    
    flats.forEach((flat, index) => {
      if (!flat.exists) {
        if (index === 0) {
          // add header once for multiple flats of same company
          let companyName = getCompanyName(companies, flat.companyId);
          text += `<h2>${companyName}</h2>`;
        }
        
        text += `<a href="${flat.url}">${flat.title}</a><br />`;
      }
    });
    
    text += '<br />';
  }
  
  return text;
}

function getCompanyName(companies, id) {
  for (let comp of companies) {
    if (comp.id === id) {
      return comp.name;
    }
  }
}