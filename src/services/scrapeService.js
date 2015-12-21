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
  let companyNames = getCompanyNames(companies);
  
  for (let flats of flatResponses) {
    
    flats.forEach((flat, index) => {
      if (!flat.exists) {
        if (index === 0) {
          // add single header for multiple flats of same company
          text += `<h2>${companyNames[flat.companyId]}</h2><ul>`;
        }
        if (index === flats.length - 1) {
          text += `</ul>`;
        }
        
        text += `<li><a href="${flat.url}">${flat.title}</a></li>`;
      }
    });
    
    text += '<br />';
  }
  
  return text;
}

function getCompanyNames(companies) {
  let companyNames = {};
  for (let comp of companies) {
    companyNames[comp.id] = comp.name;
  }
  return companyNames;
}