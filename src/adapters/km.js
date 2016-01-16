'use strict';

let KmAdapter = require('./base/KmAdapter');

module.exports.scrape = () => {
  let adapter = new KmAdapter(
    'km',
    'http://www.koehler-und-meinzer.de/aktuelles/im-verkauf/'
  );
  
  return adapter.scrape();
}