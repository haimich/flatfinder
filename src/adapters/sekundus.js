'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'sekundus';
const URL = 'http://www.sekundus.de/';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL + 'objekte.html')
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#content_left_body > div').each((i, el) => {
        let title = $(el).find('.referenzen_list_title').text().trim();
        let flatUrl = $(el).find('a').attr('href');
        
        let flat = new Flat(COMPANY_ID, title, URL + flatUrl);
        flats.push(flat);
      });
      
      return flats;
    }); 
}