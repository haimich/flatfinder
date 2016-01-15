'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'engelvoelkers';
const URL = 'https://www.engelvoelkers.com';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL + '/search?startIndex=0&businessArea=&q=&facets=bsnssr%3Aresidential%3Bcntry%3Agermany%3Bdstrct%3Akarlsruhe%3Bobjcttyp%3Acondo%3Brgn%3Abaden_wuerttem%3Brms%3A[3+TO+7]%3Btyp%3Abuy%3Blvngspc%3A[100+TO+304]%3B&pageSize=10&language=de&view=LISTE')
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#results .residential-buy').each((i, el) => {
        let title = $(el).find('.item_details h2').text().trim();
        let flatUrl = $(el).find('a.ev-exposee-teaser-link').attr('href');
        
        let flat = new Flat(COMPANY_ID, title, URL + flatUrl);
        flats.push(flat);
      });
      
      return flats;
    }); 
}