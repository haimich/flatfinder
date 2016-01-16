'use strict';

let FlowfactAdapter = require('./base/FlowfactAdapter');

module.exports.scrape = () => {
  let adapter = new FlowfactAdapter(
    'immowenk',
    'http://517993.flowfact-sites.net/immoframe/?pageno=INSERTPAGE'
  );
  
  return adapter.scrape();
}