'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'wipfler',
    'http://www.wipfler-gmbh.de/immobilien/neubauprojekte/',
    '#mainNav2 #mainNav3 a', {
      useAbsoluteUrls: true
    }
  );
  
  return adapter.scrape();
}