'use strict';

let WeststadtmaklerAdapter = require('./base/WeststadtmaklerAdapter');

module.exports.scrape = () => {
  let adapter = new WeststadtmaklerAdapter(
    'weststadtmakler',
    'http://www.weststadtmakler.de/'
  );
  
  return adapter.scrape();
}