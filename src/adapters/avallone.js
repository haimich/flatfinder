'use strict';

let FlowfactAdapter = require('./base/FlowfactAdapter');

module.exports.scrape = () => {
  let adapter = new FlowfactAdapter(
    'avallone',
    'http://540510.flowfact-sites.net/immoframe/?clear=1&typefilter=|1&pageno=INSERTPAGE'
  );
  
  return adapter.scrape();
}