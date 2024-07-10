'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'can',
    'https://www.can-immobilien-ka.de/de/0__69_1_0__/immobilien-haeuser.html',
    '.wrapper_liste h2'
  );
  
  return adapter.scrape();
}