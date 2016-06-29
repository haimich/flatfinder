'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'wipfler',
    'http://www.wipfler-gmbh.de/neubau/',
    '.diyfeModGridElement h2', {
      useAbsoluteUrls: true,
      getUrlFromElement: ($el) => {
        return $el.parent().parent().find('a.imagewrapper').attr('href');
      }
    }
  );
  
  return adapter.scrape();
}