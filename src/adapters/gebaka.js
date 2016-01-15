'use strict';

let GebakaAdapter = require('./base/GebakaAdapter');

const COMPANY_ID = 'gebaka';

module.exports.scrape = () => {
  let adapter = new GebakaAdapter(
    COMPANY_ID,
    'http://www.gebaka.de/index2.php?site=objekteaktuell&umenue=1&kategorie=Kaufobjekte'
  );
  
  return adapter.scrape();
}