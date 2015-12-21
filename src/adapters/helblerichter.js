'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'helblerichter';
const URL = 'http://www.helble-richter.de/immobilien/wohnen/ergebnis?objektart=3&miete_kauf=8&preis_von=200000&preis_bis=450000&zimmer_von=3&zimmer_bis=6&Suchen=Suchen';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('.suchergebnis.immobilien > li').each((i, el) => {
        let link = $(el).find('a');
        let flatUrl = link.attr('href');
        let text = link.text().trim();
        
        let price = $(el).find('.immo-details.preis dd').text().trim();
        
        let flat = new Flat(COMPANY_ID, `${text} (${price})`, 'http://www.helble-richter.de/' + flatUrl);
        flats.push(flat);
      });
      
      return flats;
    });
}