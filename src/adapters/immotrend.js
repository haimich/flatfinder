'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'immotrend';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://www.immotrend.com/',
    '#menu .first .third li a', {
      encoding: 'binary'
    }
  );
  
  return adapter.scrape();
}