'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'pellrich',
    'http://www.pell-rich.de/category/wohnen/wohnung/',
    '#main_content .articles h2 a', {
      useAbsoluteUrls: true
    }
  );
  
  return adapter.scrape();
}