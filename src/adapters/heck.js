'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'heck',
    'http://www.heck-immobilien.de',
    '#content .realestate .title a', {
      urlSuffix: '/immobilien-angebote/eigentumswohnungen/'
    }
  );
  
  return adapter.scrape();
}