'use strict';

let FlowfactAdapter = require('./base/FlowfactAdapter');

const COMPANY_ID = 'immowenk';

module.exports.scrape = () => {
  let adapter = new FlowfactAdapter(COMPANY_ID, 'http://517993.flowfact-sites.net/immoframe/?pageno=INSERTPAGE');
  
  return adapter.scrape();
}