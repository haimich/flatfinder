'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'ewg',
    'http://www.ewg-ka.de',
    '.project_inner a'
  );
  
  return adapter.scrape();
}