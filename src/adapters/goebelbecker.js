'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'goebelbecker',
    'http://www.goebelbecker-bau.de/',
    '#menu .second li a', {
      encoding: 'binary'
    }
  );
  
  return adapter.scrape();
}