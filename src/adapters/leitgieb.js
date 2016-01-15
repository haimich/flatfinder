'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'leitgieb';
const URL = 'http://www.leitgieb-immobilien.de/html/immobilien.html';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request({
    uri: URL,
    encoding: 'binary'
  })
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('p span b u').each((i, el) => {
        let title = $(el).text().trim();
        
        let flat = new Flat(COMPANY_ID, title, URL);
        flats.push(flat);
      });
      
      return flats;
    }); 
}