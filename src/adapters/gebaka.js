'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'gebaka',
    'https://www.gebaka.de/objekte/#projekte',
    '.project h3', {
      useAbsoluteUrls: true
    }
  );
  
  return adapter.scrape();
}