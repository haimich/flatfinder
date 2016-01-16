'use strict';

let CuffaroAdapter = require('./base/CuffaroAdapter');

module.exports.scrape = () => {
  let adapter = new CuffaroAdapter(
    'cuffaro',
    'http://www.cuffaro-immobilien.de/immobilien/page/INSERTPAGE/?post_type=immomakler_object&vermarktungsart=kauf&nutzungsart=wohnen&typ&ort&von-qm=90.00&bis-qm=180.00&von-zimmer=2.00&bis-zimmer=6.00&von-kaltmiete=0.00&bis-kaltmiete=900.00&von-kaufpreis=200000.00&bis-kaufpreis=475000.00#038;vermarktungsart=kauf&nutzungsart=wohnen&typ&ort&von-qm=90.00&bis-qm=180.00&von-zimmer=2.00&bis-zimmer=6.00&von-kaltmiete=0.00&bis-kaltmiete=900.00&von-kaufpreis=200000.00&bis-kaufpreis=475000.00'
  );
  
  return adapter.scrape();
}