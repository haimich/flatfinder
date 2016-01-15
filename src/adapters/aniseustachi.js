'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'aniseustachi';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  let flats = [];
  return scrapePage(1, flats); 
}

function scrapePage(page, flats) {
  let url = `http://541509.flowfact-sites.net/immoframe/?pageno=${page}`;
  console.log('Scraping', COMPANY_ID, page);

  return request(url)
    .then(response => {
      let $ = cheerio.load(response);
      let foundOffers = false;
      
      $('div h3 a').each((i, el) => {
        foundOffers = true;
        let title = $(el).text().trim();
        let flatUrl = $(el).attr('href');
        
        let type = $(el).closest('div').find('ul li').first().text().trim();
        
        if (type.indexOf('Praxisetage') >= 0 ||
            type.indexOf('Büro') >= 0 ||
            type.indexOf('Laden') >= 0 ||
            type.indexOf('Lagerfläche') >= 0 ||
            type.indexOf('Verkaufsfläche') >= 0 ||
            type.indexOf('Verkaufsfläche') >= 0 ||
            type.indexOf('Verkaufsfläche') >= 0) {
          return;
        }
        
        let flat = new Flat(COMPANY_ID, title, flatUrl);
        flats.push(flat);
      });
      
      if (foundOffers) {
        return scrapePage(page + 1, flats); // recurse
      } else {
        return flats;
      }
    })
    .catch((error) => {
      if (error.statusCode !== 404) {
        console.log('Got error', error);
      }
      return flats;
    });
}