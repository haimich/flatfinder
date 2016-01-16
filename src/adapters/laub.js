'use strict';

let LaubAdapter = require('./base/LaubAdapter');

module.exports.scrape = () => {
  let adapter = new LaubAdapter(
    'laub',
    'http://www.laub-immobilien.de/texte/texte.php?text=1007&mt=M&me=33&art=m&mode=suche&objpage=INSERTPAGE&f8=&f3=2&f53=&f54=&'
  );
  
  return adapter.scrape();
}