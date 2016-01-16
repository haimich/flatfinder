'use strict';

let GebakaAdapter = require('./base/GebakaAdapter');

module.exports.scrape = () => {
  let adapter = new GebakaAdapter(
    'gebaka',
    'http://www.gebaka.de/index2.php?site=objekteaktuell&umenue=1&kategorie=Kaufobjekte'
  );
  
  return adapter.scrape();
}