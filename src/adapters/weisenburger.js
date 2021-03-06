'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'weisenburger',
    'http://www.weisenburger.de/',
    '#left_block ul li ul li a', {
      urlSuffix: 'kaufen/aktuelle-wohnobjekte.html?no_cache=1'
    }
  );
  
  return adapter.scrape();
}