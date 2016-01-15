'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'forum';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://www.forum-bautraeger.de/angebote-neubau-und-sanierung/wohnung-zum-kauf/',
    '#main #main-column h5 a', {
      hasAbsoluteUrls: true
    }
  );
  
  return adapter.scrape();
}