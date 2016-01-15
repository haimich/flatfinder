'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'volkswohnung';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'https://www.volkswohnung.com/angebote/kaufen/',
    '.tx-offers'
  );
  
  return adapter.scrape();
}