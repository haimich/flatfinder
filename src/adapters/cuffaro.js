'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'cuffaro';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  let flats = [];
  return scrapePage(1, flats);
}

function scrapePage(page, flats) {
  let url = `http://www.cuffaro-immobilien.de/immobilien/page/${page}/?post_type=immomakler_object&vermarktungsart=kauf&nutzungsart=wohnen&typ&ort&von-qm=90.00&bis-qm=180.00&von-zimmer=2.00&bis-zimmer=6.00&von-kaltmiete=0.00&bis-kaltmiete=900.00&von-kaufpreis=200000.00&bis-kaufpreis=475000.00#038;vermarktungsart=kauf&nutzungsart=wohnen&typ&ort&von-qm=90.00&bis-qm=180.00&von-zimmer=2.00&bis-zimmer=6.00&von-kaltmiete=0.00&bis-kaltmiete=900.00&von-kaufpreis=200000.00&bis-kaufpreis=475000.00`;
  console.log('Scraping', page);
  
  return request(url)
    .then(response => {
      let $ = cheerio.load(response);
      
      $('.property-details').each((i, el) => {
        let name = $(el).find('.property-title a').text().trim();
        let flatUrl = $(el).find('.property-title a').attr('href');
        let subtitle = $(el).find('.property-subtitle').text().trim();
        
        let flat = new Flat(COMPANY_ID, `${name} (${subtitle})`, flatUrl);
        flats.push(flat);
      });
      
      return scrapePage(page + 1, flats); // recurse
    })
    .catch((error) => {
      console.log('Got error', error.statusCode);
      return flats;
    });
}