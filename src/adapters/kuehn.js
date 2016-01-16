'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'kuehn',
    'http://www.kuehn-immobilien-gmbh.de/immobilien/',
    '#content_area .diyfeLiveArea h1'
  );
  
  return adapter.scrape();
}