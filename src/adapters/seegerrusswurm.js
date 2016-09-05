'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'seegerrusswurm',
    'http://www.seeger-russwurm.de/Immobilien.htm?immobilienart=wohnung&finanzierung=kauf&preis_bis=%25E2%2588%259E&preis_von=180.000&groesse_bis=%25E2%2588%259E&groesse_von=100&zimmer_bis=%25E2%2588%259E&zimmer_von=3',
    '#objekt_suchErgebnisse .immoTitle'
  );
  
  return adapter.scrape();
}