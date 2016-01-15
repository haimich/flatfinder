'use strict';

let SpakaAdapter = require('./base/SpakaAdapter');

const COMPANY_ID = 'spaka';

module.exports.scrape = () => {
  let adapter = new SpakaAdapter(
    COMPANY_ID,
    'http://www.immocenter-karlsruhe.de/immobilienangebot/eigentumswohnungen/eigentumswohnungen.html?s=INSERTPAGE'
  );
  
  return adapter.scrape();
}