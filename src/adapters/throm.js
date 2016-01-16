'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'throm',
    'http://throm.de/angebote-verkauf.php',
    '.angebot-txt .newstitle'
  );
  
  return adapter.scrape();
}