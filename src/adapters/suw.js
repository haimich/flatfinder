'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'suw',
    'http://www.suw-bautraeger.de/immobilien/',
    '#mainNav2 li a', {
      useAbsoluteUrls: true
    }
  );
  
  return adapter.scrape();
}