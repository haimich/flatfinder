'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'artekt',
    'http://artekt.de/wohnen_kauf.html',
    '#rechtsbild h3'
  );
  
  return adapter.scrape();
}