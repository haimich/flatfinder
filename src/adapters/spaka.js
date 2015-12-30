'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let urlModule = require('url');
let Flat = require('../models/Flat');

const COMPANY_ID = 'spaka';
const PER_PAGE = 9;
const PRICE_REGEX = /Kaufpreis([0-9.,-]*).*/; 

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  let flats = [];
  return scrapePage(0, flats);
}

function scrapePage(page, flats) {
  let url = `http://www.immocenter-karlsruhe.de/immobilienangebot/eigentumswohnungen/eigentumswohnungen.html?s=${page}`;
  console.log('Scraping', page);
  
  return request(url)
    .then(response => {
      let $ = cheerio.load(response);
      let numberOfOffers = 0;
      
      $('.estateItem').each((i, el) => {
        numberOfOffers += 1;
        let title = $(el).find('.titleContainer').text().trim();
        let flatUrl = $(el).find('.imgContainer a').attr('href');
        
        let priceText = $(el).find('.showDetails div div').text();
        let price = PRICE_REGEX.exec(priceText)[1];
        
        let flat = new Flat(COMPANY_ID, `${title} (${price})`, flatUrl);
        flats.push(flat);
      });
      
      if (numberOfOffers === PER_PAGE) {
        return scrapePage(page + PER_PAGE, flats); // recurse
      } else {
        return flats;
      }
    })
}