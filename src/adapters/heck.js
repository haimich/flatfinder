'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'heck';
const URL = 'http://www.heck-immobilien.de';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL + '/immobilien-angebote/eigentumswohnungen/')
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#content .realestate .title a').each((i, el) => {
        let title = $(el).text().trim();
        let flatUrl = $(el).attr('href');
        
        let flat = new Flat(COMPANY_ID, title, URL + flatUrl);
        flats.push(flat);
      });
      
      return flats;
    }); 
}