'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'hustherbold',
    'http://www.hust-herbold.de/',
    '#all_offers .offer .nb-maklerTool-objectList-item-headline', {
      urlSuffix: 'immobilienangebote/kaufen/wohnung/',
      getUrlFromElement: ($el) => {
        return $el.closest('.offer').find('a.exposeLink').attr('href');
      }
    }
  );

  return adapter.scrape();
}