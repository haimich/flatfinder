'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'neubaukompass',
    'http://rhein-neckar.neubaukompass.de',
    '.itm-neubau-projekte h2 a', {
      urlSuffix: '/Karlsruhe/Immobilien-in-Karlsruhe.html'
    }
  );
  
  return adapter.scrape();
}