'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'cuffaro';
const URL = 'http://www.cuffaro-immobilien.de/immobilien/?post_type=immomakler_object&vermarktungsart=kauf&nutzungsart=wohnen&typ=&ort=&von-qm=0.00&bis-qm=180.00&von-zimmer=0.00&bis-zimmer=6.00&von-kaltmiete=0.00&bis-kaltmiete=900.00&von-kaufpreis=0.00&bis-kaufpreis=475000.00';

module.exports.scrape = () => {
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('.property-details').each((i, el) => {
        let name = $(el).find('.property-title a').text().trim();
        let url = $(el).find('.property-title a').attr('href');
        let subtitle = $(el).find('.property-subtitle').text().trim();
        
        let flat = new Flat(COMPANY_ID, `${name} (${subtitle})`, 'TODO');
        flats.push(flat);
      });
      
      return flats;
    });
}