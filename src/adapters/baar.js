'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'baar';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    'http://www.baar-bauunternehmen.de/',
    '#content li h4 a', {
      urlSuffix: '?wohnungsbau,38'
    }
  );
  
  return adapter.scrape();
}