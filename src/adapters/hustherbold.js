'use strict';

let HustHerboldAdapter = require('./base/HustHerboldAdapter');

module.exports.scrape = () => {
  let adapter = new HustHerboldAdapter(
    'hustherbold',
    'http://www.hust-herbold.de/'
  );
  
  return adapter.scrape();
}