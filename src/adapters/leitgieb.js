'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'leitgieb';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://www.leitgieb-immobilien.de/html/immobilien.html',
    'p span b u', {
      encoding: 'binary'
    }
  );
  
  return adapter.scrape();
}