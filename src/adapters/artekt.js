'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'artekt';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://artekt.de/wohnen_kauf.html',
    '#rechtsbild h3'
  );
  
  return adapter.scrape();
}