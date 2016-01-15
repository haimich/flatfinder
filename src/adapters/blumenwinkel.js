'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'blumenwinkel';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://www.blumenwinkel.com/',
    '.row .grid_6 h3', {
      urlSuffix: '2-0-aktuelle-Projekte.html',
      getUrlFromElement: ($el) => {
        return $el.parent().find('a').attr('href');
      }
    }
  );
  
  return adapter.scrape();
}