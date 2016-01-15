'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'suw';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://www.suw-bautraeger.de/immobilien/',
    '#mainNav2 li a', {
      useAbsoluteUrls: true
    }
  );
  
  return adapter.scrape();
}