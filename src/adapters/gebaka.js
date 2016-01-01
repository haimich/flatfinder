'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'gebaka';
const URL = 'http://www.gebaka.de/index2.php?site=objekteaktuell&umenue=1&kategorie=Kaufobjekte';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#index2content > div').each((i, el) => {
        if ($(el).css('width') === '400px') {
          let text = $(el).find('.ueberschrift').text().trim();
          
          let flat = new Flat(COMPANY_ID, text, URL);
          flats.push(flat);
        }
      });
      
      return flats;
    }); 
}