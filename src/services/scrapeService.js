'use strict';

let fs = require('fs');
let path = require('path');
let Promise = require('bluebird');
let mailService = require('./mailService');

let adapters = [
  // require('../adapters/km'),
  require('../adapters/weisenburger'),
  // require('../adapters/cuffaro'),
];

module.exports.scrapeAll = () => {
  return Promise.map(adapters, adapter => adapter.scrape())
    .then((flatResponses) => {
      // mailService.sendMail(
      //   'Flatfinder found new offers',
      //   JSON.stringify(flatResponses)
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