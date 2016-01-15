'use strict';

let SpeckAdapter = require('./base/SpeckAdapter');

const COMPANY_ID = 'speck';

module.exports.scrape = () => {
  let adapter = new SpeckAdapter(
    COMPANY_ID,
    'http://www.speck-immo.de/unsere-immobilienangebote/verkauf/'
  );
  
  return adapter.scrape();
}