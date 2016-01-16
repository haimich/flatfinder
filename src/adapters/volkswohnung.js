'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'volkswohnung',
    'https://www.volkswohnung.com/angebote/kaufen/',
    '.tx-offers'
  );
  
  return adapter.scrape();
}