'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'besserwohnen';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://www.besser-wohnen-in-karlsruhe.de/',
    '#content_inner .paragraph_headline h1 a'
  );
  
  return adapter.scrape();
}