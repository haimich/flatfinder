'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'can',
    'http://www.can-immobilien-ka.de/de/0__2_0_0__dadw/immobilien-wohnungen-kauf.html',
    '#listenansicht h1'
  );
  
  return adapter.scrape();
}