'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'ewg';
const URL = 'http://www.ewg-ka.de';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL + '/ewg/wohnen/index.php?navid=366561366561')
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#blockContent .elementBoxFixedHeight').each((i, el) => {
        let title = $(el).find('p').first().text().trim();
        let flatUrl = $(el).find('a').attr('href');
        
        let flat = new Flat(COMPANY_ID, title, URL + flatUrl);
        flats.push(flat);
      });
      
      return flats;
    }); 
}