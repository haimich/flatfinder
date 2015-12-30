'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'weststadtmakler';
const URL = 'http://www.weststadtmakler.de/immobilien/objekte.htm';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('.standard-white-text .container > hr').each((i, el) => {
        let next = $(el).next();
        if (next.find('a').length === 1) {
          let text = next.find('a').text().trim();
          let flatUrl = next.find('a').attr('href');
          if (flatUrl.startsWith('../')) {
            flatUrl = flatUrl.replace('../', 'http://www.weststadtmakler.de/');
          }
          
          let description = next.next();
          if (description.text().indexOf('schon verkauft') === -1) {
            let flat = new Flat(COMPANY_ID, text, flatUrl);
            flats.push(flat);
          }
        }
      });
      
      return flats;
    });
}