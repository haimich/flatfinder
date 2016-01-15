'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');
let UA = require('../models/UserAgent');

const COMPANY_ID = 'kassel';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'https://www.facebook.com/ImmobilienKassel?_fb_noscript=1',
    '.userContent', {
      useragent: UA.FIREFOX //we have to fake the ua to get the desired result
    }
  );
  
  return adapter.scrape();
}