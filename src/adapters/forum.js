'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'forum',
    'https://forum-bautraeger.de/objekte/planung',
    '.objekt-item-text h3', {
      useAbsoluteUrls: true
    }
  );
  
  return adapter.scrape();
}