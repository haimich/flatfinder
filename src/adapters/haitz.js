'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'haitz';
const URL = 'http://www.haitz-gmbh.de/';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL + 'index.php?id=7')
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#content .csc-textpicHeader').each((i, el) => {
        let title = $(el).text().trim();
        let flatUrl = $(el).parent().find('a').attr('href');
        
        let flat = new Flat(COMPANY_ID, title, URL + flatUrl);
        flats.push(flat);
      });
      
      return flats;
    }); 
}