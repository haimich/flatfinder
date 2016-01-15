'use strict';

let KmAdapter = require('./base/KmAdapter');

const COMPANY_ID = 'km';

module.exports.scrape = () => {
  let adapter = new KmAdapter(
    COMPANY_ID,
    'http://www.koehler-und-meinzer.de/aktuelles/im-verkauf/'
  );
  
  return adapter.scrape();
}