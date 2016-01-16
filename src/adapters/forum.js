'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'forum',
    'http://www.forum-bautraeger.de/angebote-neubau-und-sanierung/wohnung-zum-kauf/',
    '#main #main-column h5 a', {
      useAbsoluteUrls: true
    }
  );
  
  return adapter.scrape();
}