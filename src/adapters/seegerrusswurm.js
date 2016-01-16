'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'seegerrusswurm',
    'http://www.seeger-russwurm.de/immobilienfinder/wohnimmobilien.php?immobilienart=wohnung&finanzierung=kauf&preis_bis=%E2%88%9E&preis_von=180.000&groesse_bis=%E2%88%9E&groesse_von=100&zimmer_bis=%E2%88%9E&zimmer_von=3',
    '#content .objekt_headline a'
  );
  
  return adapter.scrape();
}