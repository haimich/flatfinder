'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'artekt';
const URL = 'http://artekt.de/wohnen_kauf.html';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#rechtsbild h3').each((i, el) => {
        let title = $(el).text().trim();
        
        let flat = new Flat(COMPANY_ID, title, URL);
        flats.push(flat);
      });
      
      return flats;
    }); 
}