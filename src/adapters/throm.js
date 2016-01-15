'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'throm';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://throm.de/angebote-verkauf.php',
    '.angebot-txt .newstitle'
  );
  
  return adapter.scrape();
}