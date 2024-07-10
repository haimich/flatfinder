'use strict';

let CuffaroAdapter = require('./base/CuffaroAdapter');

module.exports.scrape = () => {
  let adapter = new CuffaroAdapter(
    'cuffaro',
    'https://www.cuffaro-immobilien.de/immobilien/page/INSERTPAGE/?post_type=immomakler_object&vermarktungsart=kauf&nutzungsart=wohnen&typ&ort'
  );
  
  return adapter.scrape();
}