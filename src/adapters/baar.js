'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'baar';
const URL = 'http://www.baar-bauunternehmen.de/';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL + '?wohnungsbau,38')
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#content li h4 a').each((i, el) => {
        let title = $(el).text().trim();
        let flatUrl = $(el).attr('href');
        
        let flat = new Flat(COMPANY_ID, title, URL + flatUrl);
        flats.push(flat);
      });
      
      return flats;
    }); 
}