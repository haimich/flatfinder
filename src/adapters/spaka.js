'use strict';

let SpakaAdapter = require('./base/SpakaAdapter');

module.exports.scrape = () => {
  let adapter = new SpakaAdapter(
    'spaka',
    'http://www.immocenter-karlsruhe.de/immobilienangebot/eigentumswohnungen/eigentumswohnungen.html?s=INSERTPAGE'
  );
  
  return adapter.scrape();
}