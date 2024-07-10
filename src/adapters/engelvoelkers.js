'use strict';

const PagedAdapter = require('./base/PagedAdapter');

module.exports.scrape = () => {
  let adapter = new PagedAdapter(
    'engelvoelkers',
    'https://www.engelvoelkers.com/de/de/immobilien/res/kaufen/immobilien',
    'article h3', {
      startPage: 1,
      useAbsoluteUrls: true,
      urlSuffix: 'placeId=ChIJCXjgokgGl0cRf-63THNV_LY&marketingType=sale&businessArea=residential&sorting=publishedAt&placeName=Karlsruhe%2C%20Deutschland&bbox=49.0912684%2C8.5416581%2C48.9404298%2C8.2774096&country=Germany&countryAlpha2=DE&currency=EUR&surfaceUnit=SQMT&page=INSERTPAGE&searchRadius=20&region=Baden-Württemberg&city=Karlsruhe&price%5Bmin%5D=300000&price%5Bmax%5D=850000&livingSurface%5Bmin%5D=130&livingSurface%5Bmax%5D=500',
      getUrlFromElement: ($el) => {
        return $el.closest('article').find('a').attr('href');
      }
    }
  );
  
  return adapter.scrape();
}