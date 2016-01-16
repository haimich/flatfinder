'use strict';

let GigAdapter = require('./base/GigAdapter');

module.exports.scrape = () => {
  let adapter = new GigAdapter(
    'gig',
    'http://www.giggmbh.de/'
  );
  
  return adapter.scrape();
}