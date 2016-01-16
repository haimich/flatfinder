'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'haitz',
    'http://www.haitz-gmbh.de/',
    '#content .csc-textpicHeader', {
      urlSuffix: 'index.php?id=7',
      getUrlFromElement: ($el) => {
        return $el.parent().find('a').attr('href');
      }
    }
  );
  
  return adapter.scrape();
}