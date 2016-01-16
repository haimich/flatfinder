'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'blumenwinkel',
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