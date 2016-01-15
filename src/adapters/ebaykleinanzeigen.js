'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'ebaykleinanzeigen';
const URL = 'https://www.ebay-kleinanzeigen.de';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL + '/s-wohnung-kaufen/karlsruhe/anzeige:angebote/preis:280000:500000/c196l9186+wohnung_kaufen.qm_i:100,160+wohnung_kaufen.zimmer_i:3,')
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#srchrslt-content article h2 a').each((i, el) => {
        let title = $(el).text().trim();
        let flatUrl = $(el).attr('href');
        
        let flat = new Flat(COMPANY_ID, title, URL + flatUrl);
        flats.push(flat);
      });
      
      console.log(flats);
      return flats;
    }); 
}