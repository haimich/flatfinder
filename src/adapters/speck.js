'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');
let UA = require('../models/UserAgent');

const COMPANY_ID = 'speck';
const URL = 'http://www.speck-immo.de/unsere-immobilienangebote/verkauf/';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request({
      method: 'GET', 
      uri: URL,
      headers: {
        'User-Agent': UA.FIREFOX //we have to fake the ua to get the desired result
      }
  }).then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#content_area div.clearover').each((i, el) => {
        let title = $(el).find('h2').text().trim();
        
        if (isSold($, el)) {
          title += ' (verkauft)';
        }
        
        let flat = new Flat(COMPANY_ID, title, URL);
        flats.push(flat);
      });
      
      return flats;
    }); 
}

function isSold($, el) {
  let isSold = false;
  $(el).find('p strong').each((i, el) => {
    if ($(el).text().trim().indexOf('V E R K A U F T') !== -1) {
      isSold = true;
    }
  });
  return isSold;
}