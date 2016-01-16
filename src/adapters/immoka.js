'use strict';

let ImmokaAdapter = require('./base/ImmokaAdapter');

module.exports.scrape = () => {
  let adapter = new ImmokaAdapter(
    'immoka',
    'http://www.immoka.net'
  );
  
  return adapter.scrape();
}