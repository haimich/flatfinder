'use strict';

let SpakaAdapter = require('./base/SpakaAdapter');

const COMPANY_ID = 'spaka_haeuser';

module.exports.scrape = () => {
  let adapter = new SpakaAdapter(
    COMPANY_ID,
    'http://www.immocenter-karlsruhe.de/immobilienangebot/haeuser/haeuser.html?s=INSERTPAGE'
  );
  
  return adapter.scrape();
}