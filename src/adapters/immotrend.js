'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'immotrend',
    'http://www.immotrend.com/',
    '#menu .first .third li a', {
      encoding: 'binary'
    }
  );
  
  return adapter.scrape();
}