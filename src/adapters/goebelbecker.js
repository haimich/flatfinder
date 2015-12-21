'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'goebelbecker';
const URL = 'http://www.goebelbecker-bau.de/';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#menu .second li a').each((i, el) => {
        let title = $(el).text().trim();
        
        let flat = new Flat(COMPANY_ID, title, URL);
        flats.push(flat);
      });
      
      return flats;
    }); 
}