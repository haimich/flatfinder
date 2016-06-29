'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'pellrich',
    'http://pell-rich.de/wohnen/?type=wohnen',
    '.property-title h3', {
      useAbsoluteUrls: true,
      getUrlFromElement: ($el) => {
        return $el.parent().parent().attr('href');
      }
    }
  );
  
  return adapter.scrape();
}