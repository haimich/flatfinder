'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'koch-rheinstetten',
    'http://immobilien-verkauf-vermietung-rheinstetten.de/',
    '#ihpmListings .ihpmListingTitle a', {
      urlSuffix: 'objekte-wohnungen.html'
    }
  );
  
  return adapter.scrape();
}