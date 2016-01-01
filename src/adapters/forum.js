'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'forum';
const URL = 'http://www.forum-bautraeger.de/angebote-neubau-und-sanierung/wohnung-zum-kauf/';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#main #main-column h5 a').each((i, el) => {
        let title = $(el).text().trim();
        let flatUrl = $(el).attr('href');
        
        let flat = new Flat(COMPANY_ID, title, flatUrl);
        flats.push(flat);
      });
      
      return flats;
    }); 
}