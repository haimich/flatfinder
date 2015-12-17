'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'km';
const URL = 'http://www.koehler-und-meinzer.de/aktuelles/im-verkauf/';

module.exports.scrape = () => {
  return request(url)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('form .cc-m-form-checkgroup label div').each((i, el) => {
        let category = $(el).text().trim();
        if (category === 'Wohnhäuser:') {
          $(el).parent().parent().find('.cc-m-form-checkable-vertical label').each((i, el) => {
            let flat = $(el).text().trim();
            flats.push({ name: flat, url: url });
          });
        }
      });
      
      return flats;
    });
}