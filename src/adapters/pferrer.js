'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'pferrer',
    'http://www.pferrer-immobilien.de/kaufen/wohnungen/',
    '#content_area h1 span'
  );
  
  return adapter.scrape();
}