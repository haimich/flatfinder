'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'ewg',
    'https://www.ewg-ka.de/projekte/#wohnen',
    '.middle_inner h4'
  );
  
  return adapter.scrape();
}