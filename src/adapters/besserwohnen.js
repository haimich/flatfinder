'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'besserwohnen',
    'http://www.besser-wohnen-in-karlsruhe.de/',
    '#content_inner .paragraph_headline h1 a'
  );
  
  return adapter.scrape();
}