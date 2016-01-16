'use strict';

let PostbankAdapter = require('./base/PostbankAdapter');

module.exports.scrape = () => {
  let adapter = new PostbankAdapter(
    'postbank',
    'https://immobilien.postbank.de/karlsruhe/immobilien/suchergebnisse/'
  );
  
  return adapter.scrape();
}