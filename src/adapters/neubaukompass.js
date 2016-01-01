'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'neubaukompass';
const URL = 'http://rhein-neckar.neubaukompass.de';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL + '/Karlsruhe/Immobilien-in-Karlsruhe.html')
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('.itm-neubau-projekte h2 a').each((i, el) => {
        let title = $(el).text().trim();
        let flatUrl = $(el).attr('href');
        
        let flat = new Flat(COMPANY_ID, title, URL + flatUrl);
        flats.push(flat);
      });
      console.log(flats);
      return flats;
    }); 
}