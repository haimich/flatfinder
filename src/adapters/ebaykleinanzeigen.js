'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'ebaykleinanzeigen', 
    'https://www.ebay-kleinanzeigen.de',
    '#srchrslt-content article h2 a', {
      urlSuffix: '/s-wohnung-kaufen/karlsruhe/anzeige:angebote/preis:280000:500000/c196l9186+wohnung_kaufen.qm_i:100,160+wohnung_kaufen.zimmer_i:3,'
    }
  );
  
  return adapter.scrape();
}