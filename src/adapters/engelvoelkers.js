'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    'engelvoelkers',
    'https://www.engelvoelkers.com',
    '#results .residential-buy .item_details h2', {
      urlSuffix: '/search?startIndex=0&businessArea=&q=&facets=bsnssr%3Aresidential%3Bcntry%3Agermany%3Bdstrct%3Akarlsruhe%3Bobjcttyp%3Acondo%3Brgn%3Abaden_wuerttem%3Brms%3A[3+TO+7]%3Btyp%3Abuy%3Blvngspc%3A[100+TO+304]%3B&pageSize=10&language=de&view=LISTE',
      getUrlFromElement: ($el) => {
        return $el.closest('.residential-buy').find('a.ev-exposee-teaser-link').attr('href');
      }
    }
  );
  
  return adapter.scrape();
}