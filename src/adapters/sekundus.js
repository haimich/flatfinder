'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'sekundus';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://www.sekundus.de/',
    '#content_left_body > div .referenzen_list_title', {
      urlSuffix: 'objekte.html',
      getUrlFromElement: ($el) => {
        return $el.parent().find('a').attr('href');
      }
    }
  );
  
  return adapter.scrape();
}