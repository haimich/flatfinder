'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'throm';
const URL = 'http://throm.de/angebote-verkauf.php';

module.exports.scrape = () => {
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('.angebot-txt').each((i, el) => {
        let text = $(el).find('.newstitle').text().trim();
        
        let flat = new Flat(COMPANY_ID, text, URL);
        flats.push(flat);
      });
      console.log(flats);
      
      return flats;
    }); 
}