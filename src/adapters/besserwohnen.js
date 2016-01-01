'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'besserwohnen';
const URL = 'http://www.besser-wohnen-in-karlsruhe.de';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL + '/kaufangebote')
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#content_inner .paragraph_headline h1 a').each((i, el) => {
        let title = $(el).text().trim();
        let flatUrl = $(el).attr('href');
        
        if (title === '*** alle Wohnungen verkauft ***') {
          return;
        }
        
        let flat = new Flat(COMPANY_ID, title, URL + flatUrl);
        flats.push(flat);
      });
      
      return flats;
    }); 
}