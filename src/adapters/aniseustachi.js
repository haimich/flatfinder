'use strict';

let FlowfactAdapter = require('./base/FlowfactAdapter');

module.exports.scrape = () => {
  let adapter = new FlowfactAdapter(
    'aniseustachi',
    'http://541509.flowfact-sites.net/immoframe/?pageno=INSERTPAGE'
  );
  
  return adapter.scrape();
}