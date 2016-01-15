'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'immowenk';
const URL = 'http://517993.flowfact-sites.net/immoframe/?clear=1&typefilter=1AB70647-4B47-41E2-9571-CA1CA16E0308|1';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('div h3 a').each((i, el) => {
        let title = $(el).text().trim();
        let flatUrl = $(el).attr('href');
        
        let flat = new Flat(COMPANY_ID, title, flatUrl);
        flats.push(flat);
      });
      
      return flats;
    }); 
}