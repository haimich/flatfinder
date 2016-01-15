'use strict';

let SimpleAdapter = require('./base/SimpleAdapter');

const COMPANY_ID = 'kassel';
const URL_REGEX = /(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?/ig; // might match too much!

let baseUrl = 'https://www.facebook.com/ImmobilienKassel?_fb_noscript=1';

module.exports.scrape = () => {
  let adapter = new SimpleAdapter(
    COMPANY_ID,
    baseUrl,
    '.userContent', {
      useAbsoluteUrls: true,
      getUrlFromElement: ($el) => {
        let title = $el.text().trim();
        
        let urls = title.match(URL_REGEX);
        
        if (urls && urls.length >= 1) {
          return urls[0];
        } else {
          return baseUrl;
        }
      }
    }
  );
  
  return adapter.scrape();
}