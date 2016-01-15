'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'ebaykleinanzeigen';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID, 
    'https://www.ebay-kleinanzeigen.de',
    '/s-wohnung-kaufen/karlsruhe/anzeige:angebote/preis:280000:500000/c196l9186+wohnung_kaufen.qm_i:100,160+wohnung_kaufen.zimmer_i:3,',
    '#srchrslt-content article h2 a'
  );
  
  return adapter.scrape();
}