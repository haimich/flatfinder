'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'baar',
    'http://www.baar-bauunternehmen.de/',
    '#content li h4 a', {
      urlSuffix: '?wohnungsbau,38'
    }
  );
  
  return adapter.scrape();
}