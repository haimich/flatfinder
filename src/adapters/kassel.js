'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'kassel';
const URL = 'https://www.facebook.com/ImmobilienKassel?_fb_noscript=1';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request({
      method: 'GET', 
      uri: URL,
      headers: {
        'User-Agent': 'curl/7.43.0' //we have to fake the ua to get the desired result
      }
    })
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('.userContent').each((i, el) => {
        let title = $(el).text().trim();
        if (title === '') {
          return;
        }
        
        let flat = new Flat(COMPANY_ID, title, URL);
        flats.push(flat);
      });
      
      return flats;
    }); 
}