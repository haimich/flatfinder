'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'ewg';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
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