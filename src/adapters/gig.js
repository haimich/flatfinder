'use strict';

let GigAdapter = require('./base/GigAdapter');

const COMPANY_ID = 'gig';

module.exports.scrape = () => {
  let adapter = new GigAdapter(
    COMPANY_ID,
    'http://www.giggmbh.de/'
  );
  
  return adapter.scrape();
}