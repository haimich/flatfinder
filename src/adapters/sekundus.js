'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'sekundus',
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