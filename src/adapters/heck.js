'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'heck';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://www.heck-immobilien.de',
    '#content .realestate .title a', {
      urlSuffix: '/immobilien-angebote/eigentumswohnungen/'
    }
  );
  
  return adapter.scrape();
}