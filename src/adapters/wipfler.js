'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'wipfler';
const URL = 'http://www.wipfler-gmbh.de/immobilien/neubauprojekte/';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#mainNav2 #mainNav3 a').each((i, el) => {
        let title = $(el).text().trim();
        let flatUrl = $(el).attr('href');
        
        let flat = new Flat(COMPANY_ID, title, flatUrl);
        flats.push(flat);
      });
      console.log(flats);
      return flats;
    }); 
}