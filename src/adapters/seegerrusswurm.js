'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'seegerrusswurm';
const URL = 'http://www.seeger-russwurm.de/immobilienfinder/wohnimmobilien.php?immobilienart=wohnung&finanzierung=kauf&preis_bis=%E2%88%9E&preis_von=180.000&groesse_bis=%E2%88%9E&groesse_von=100&zimmer_bis=%E2%88%9E&zimmer_von=3';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#content .objekt_headline a').each((i, el) => {
        let title = $(el).text().trim();
        let flatUrl = $(el).attr('href');
        
        let flat = new Flat(COMPANY_ID, title, flatUrl);
        flats.push(flat);
      });
      
      return flats;
    }); 
}