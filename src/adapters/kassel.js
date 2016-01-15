'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'kassel';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'https://www.facebook.com/ImmobilienKassel?_fb_noscript=1',
    '.userContent'
  );
  
  return adapter.scrape();
}