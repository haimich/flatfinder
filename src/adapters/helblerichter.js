'use strict';

let PagedAdapter = require('./base/PagedAdapter');

module.exports.scrape = () => {
  let adapter = new PagedAdapter(
    'helblerichter',
    'http://www.helble-richter.de/immobilien/',
    '.property .hidden-sm a h3', {
      startPage: 1,
      useAbsoluteUrls: true,
      urlSuffix: 'wohnen?vermarktung=&objektart=&ort=&_layout=list&page=INSERTPAGE',
      getUrlFromElement: ($el) => {
        return $el.parent().attr('href');
      }
    }
  );
  
  return adapter.scrape();
}