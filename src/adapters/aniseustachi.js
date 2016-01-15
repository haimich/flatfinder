'use strict';

let FlowfactAdapter = require('./base/FlowfactAdapter');

const COMPANY_ID = 'aniseustachi';

module.exports.scrape = () => {
  let adapter = new FlowfactAdapter(COMPANY_ID, 'http://541509.flowfact-sites.net/immoframe/?pageno=INSERTPAGE', {
    typeBlacklist: [ 'Praxisetage', 'Büro', 'Laden', 'Lagerfläche', 'Verkaufsfläche' ]
  });
  
  return adapter.scrape();
}