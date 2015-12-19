'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'km';
const url = 'http://www.koehler-und-meinzer.de/aktuelles/im-verkauf/';

module.exports.scrape = () => {
  return request(url)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('form .cc-m-form-checkgroup label div').each((i, el) => {
        let category = $(el).text().trim();
        if (category === 'Wohnhäuser:') {
          $(el).parent().parent().find('.cc-m-form-checkable-vertical label').each((i, el) => {
            let title = $(el).text().trim();
            let flat = new Flat(COMPANY_ID, title, url);
            flats.push(flat);
          });
        }
      });
      
      return flats;
    }); 
}