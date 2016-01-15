'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'wipfler';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://www.wipfler-gmbh.de/immobilien/neubauprojekte/',
    '#mainNav2 #mainNav3 a', {
      useAbsoluteUrls: true
    }
  );
  
  return adapter.scrape();
}