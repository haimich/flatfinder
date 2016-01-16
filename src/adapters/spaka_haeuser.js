'use strict';

let SpakaAdapter = require('./base/SpakaAdapter');

module.exports.scrape = () => {
  let adapter = new SpakaAdapter(
    'spaka_haeuser',
    'http://www.immocenter-karlsruhe.de/immobilienangebot/haeuser/haeuser.html?s=INSERTPAGE'
  );
  
  return adapter.scrape();
}