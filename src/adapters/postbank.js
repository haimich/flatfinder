'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'postbank';
const URL = 'https://immobilien.postbank.de/karlsruhe/immobilien/suchergebnisse/'

//TODO: SPA, REST calls are secured

// module.exports.scrape = () => {
//   console.log('Scraping', COMPANY_ID);
//   let flats = [];
//   return scrapePage(1, flats);
// }

// function scrapePage(page, flats) {
//   let url = `${URL}#/search/Town=undefined&EstateTypeIds=[]&EstateSubTypeIds=[]%20&OfferType=2&Page=${page}&PageSize=20&Sort=3&OffererId=karlsruhe&EstateMetaCodeIds=[1,2,3]&GetTopEstates=true`;
//   console.log('Scraping', COMPANY_ID, page);
  
//   return request(url)
//     .then(response => {
//       let $ = cheerio.load(response);
//       let foundOffers = false;
//       console.log('THERE', $.text());
//       $('.fio-object .fio-object-info').each((i, el) => {
//         foundOffers = true;
//         let title = $(el).find('h3').text().trim();
//         let flatUrl = $(el).find('a').attr('href');
        
//         let flat = new Flat(COMPANY_ID, title, URL + flatUrl);
//         flats.push(flat);
//       });
      
//       if (foundOffers) {
//         return scrapePage(page + 1, flats); // recurse
//       } else {
//         console.log(flats);
//         return flats;
//       }
//     })
// }