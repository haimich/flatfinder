'use strict';

let PagedAdapter = require('./base/PagedAdapter');

module.exports.scrape = () => {
  let adapter = new PagedAdapter(
    'koch-rheinstetten',
    'http://immobilien-verkauf-vermietung-rheinstetten.de',
    '#ihpmListings .ihpmListingTitle a', {
      startPage: 1,
      urlSuffix: '/objekte-wohnungen.html?&ihpmsurl=%2Fwidgets%2Fapi%2Fsel%2Fm%2F907654f691f869115adc89c21%2Fihpmpage%2FINSERTPAGE%2Fihpmss%2F65a41c834e%2Fihpmcpp%2F10%2FihpmSortBy%2F19'
    }
  );
  
  return adapter.scrape();
}