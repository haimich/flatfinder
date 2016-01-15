'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'goebelbecker';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://www.goebelbecker-bau.de/',
    '#menu .second li a', {
      encoding: 'binary'
    }
  );
  
  return adapter.scrape();
}