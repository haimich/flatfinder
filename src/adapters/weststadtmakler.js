'use strict';

let WeststadtmaklerAdapter = require('./base/WeststadtmaklerAdapter');

const COMPANY_ID = 'weststadtmakler';

module.exports.scrape = () => {
  let adapter = new WeststadtmaklerAdapter(
    COMPANY_ID,
    'http://www.weststadtmakler.de/'
  );
  
  return adapter.scrape();
}