'use strict';

let HustherboldAdapter = require('./base/HustherboldAdapter');

module.exports.scrape = () => {
  let adapter = new HustherboldAdapter(
    'hustherbold',
    'http://www.hust-herbold.de/'
  );
  
  return adapter.scrape();
}