'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'ewg',
    'http://www.ewg-ka.de',
    '#blockContent .elementBoxFixedHeight p:first-child', {
      urlSuffix: '/ewg/wohnen/index.php?navid=366561366561',
      getUrlFromElement: ($el) => {
        return $el.parent().find('a').attr('href');
      }
    }
  );
  
  return adapter.scrape();
}