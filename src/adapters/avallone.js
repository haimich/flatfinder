'use strict';

let AvaloneAdapter = require('./base/AvaloneAdapter');

module.exports.scrape = () => {
  let adapter = new AvaloneAdapter(
    'avallone',
    'https://immobilien.avallone.de/ff/immobilien/?schema=house_purchase&price=&ffpage=INSERTPAGE&sort=date'
  );
  
  return adapter.scrape();
}