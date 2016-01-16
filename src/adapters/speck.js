'use strict';

let SpeckAdapter = require('./base/SpeckAdapter');

module.exports.scrape = () => {
  let adapter = new SpeckAdapter(
    'speck',
    'http://www.speck-immo.de/unsere-immobilienangebote/verkauf/'
  );
  
  return adapter.scrape();
}