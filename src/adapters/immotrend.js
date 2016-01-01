'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'immotrend';
const URL = 'http://www.immotrend.com/';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request({
    uri: URL,
    encoding: 'binary'
  })
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#menu .first .third li a').each((i, el) => {
        let title = $(el).text().trim();
        let flatUrl = $(el).attr('href');
        
        let flat = new Flat(COMPANY_ID, title, URL + flatUrl);
        flats.push(flat);
      });
      console.log(flats);
      return flats;
    }); 
}