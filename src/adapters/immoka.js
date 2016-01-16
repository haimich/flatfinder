'use strict';

let ImmokaAdapter = require('./base/ImmokaAdapter');

const COMPANY_ID = 'immoka';

module.exports.scrape = () => {
  let adapter = new ImmokaAdapter(
    COMPANY_ID,
    'http://www.immoka.net'
  );
  
  return adapter.scrape();
}