'use strict';

let Promise = require('bluebird');
let mailService = require('./mailService');
let offersService = require('./offersService');

let adapters = [
  require('../adapters/km'),
  require('../adapters/weisenburger'),
  require('../adapters/cuffaro'),
];

module.exports.scrapeAll = () => {
  return Promise.map(adapters, adapter => adapter.scrape())
    .then((flatResponses) => {
      offersService.hasOffer('km2', '2-Zimmer-Eigentumswohnung Karlsruhe-Beiertheim')
        .then(response => console.log(response));
    })
    .then((flatResponses) => {
      // mailService.sendMail(
      //   'Flatfinder found new offers',
      //   prepareMailText(flatResponses)
      // );
      
      return flatResponses;
    })
    .catch((err) => {
      // mailService.sendMail(
      //   'Flatfinder had a hickup',
      //   JSON.stringify(err.stack)
      // );
      
      throw err;
    });
}

function prepareMailText(flatResponses) {
  let text = '';
  
  for (let flats of flatResponses) {
    for (let flat of flats) {
      text += `<strong>${flat.companyId}</strong>: <a href="${flat.url}">${flat.title}</a><br />`;
    }
    text += '<br />';
  }
  
  return text;
}