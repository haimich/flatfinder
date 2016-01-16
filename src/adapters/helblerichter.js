'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'helblerichter',
    'http://www.helble-richter.de',
    '.suchergebnis.immobilien > li a', {
      urlSuffix: '/immobilien/wohnen/ergebnis?objektart=3&miete_kauf=8&preis_von=200000&preis_bis=450000&zimmer_von=3&zimmer_bis=6&Suchen=Suchen',
      encoding: 'binary'
    }
  );
  
  return adapter.scrape();
}