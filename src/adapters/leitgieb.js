'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'leitgieb',
    'http://www.leitgieb-immobilien.de/html/immobilien.html',
    'p span b u', {
      encoding: 'binary'
    }
  );
  
  return adapter.scrape();
}