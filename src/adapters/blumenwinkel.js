'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'blumenwinkel';
const URL = 'http://www.blumenwinkel.com/';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL + '2-0-aktuelle-Projekte.html')
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('.row .grid_6 h3').each((i, el) => {
        let title = $(el).text().trim();
        let flatUrl = $(el).parent().find('a').attr('href');
        
        let flat = new Flat(COMPANY_ID, title, URL + flatUrl);
        flats.push(flat);
      });
      
      return flats;
    }); 
}