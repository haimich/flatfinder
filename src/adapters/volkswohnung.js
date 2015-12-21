'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'volkswohnung';
const URL = 'https://www.volkswohnung.com/angebote/kaufen/';

module.exports.scrape = () => {
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('.tx-offers').each((i, el) => {
        let title = $(el).text().trim();
        
        let flat = new Flat(COMPANY_ID, title, URL);
        flats.push(flat);
      });
      
      return flats;
    }); 
}