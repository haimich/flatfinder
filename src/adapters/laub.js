'use strict';

let LaubAdapter = require('./base/LaubAdapter');

const COMPANY_ID = 'laub';

module.exports.scrape = () => {
  let adapter = new LaubAdapter(
    COMPANY_ID,
    'http://www.laub-immobilien.de/texte/texte.php?text=1007&mt=M&me=33&art=m&mode=suche&objpage=INSERTPAGE&f8=&f3=2&f53=&f54=&'
  );
  
  return adapter.scrape();
}