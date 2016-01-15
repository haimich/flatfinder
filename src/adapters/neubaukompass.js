'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'neubaukompass';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://rhein-neckar.neubaukompass.de',
    '.itm-neubau-projekte h2 a', {
      urlSuffix: '/Karlsruhe/Immobilien-in-Karlsruhe.html'
    }
  );
  
  return adapter.scrape();
}