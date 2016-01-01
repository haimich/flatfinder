'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let urlModule = require('url');
let Flat = require('../models/Flat');

const COMPANY_ID = 'laub'; 

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  let flats = [];
  return scrapePage(0, flats);
}

function scrapePage(page, flats) {
  let url = `http://www.laub-immobilien.de/texte/texte.php?text=1007&mt=M&me=33&art=m&mode=suche&objpage=${page}&f8=&f3=2&f53=&f54=&`;
  console.log('Scraping', page);
  
  return request({
    uri: url,
    encoding: 'binary'
  })
    .then(response => {
      let $ = cheerio.load(response);
      let foundOffers = false;
      
      $('.art-postcontent table[width=620] tr h3').each((i, el) => {
        foundOffers = true;
        let title = $(el).text().trim();
        
        let table = $(el).closest('table');
        let flatUrl = $(table).find('a').attr('href');
        let location = scrapeLocation($, table);
        
        let flat = new Flat(COMPANY_ID, location + ': ' + title, flatUrl);
        flats.push(flat);
      });
      
      if (foundOffers) {
        return scrapePage(page + 1, flats); // recurse
      } else {
        return flats;
      }
    })
}

function scrapeLocation($, element) {
  let location = '';
  let gotOrt = false;
  
  element.find('td').each((i, el) => {
    let trText = $(el).text().trim();
    
    if (trText === 'Ort:') {
      gotOrt = true;
      return;
    }
    
    if (gotOrt) {
      location = trText;
      gotOrt = false;
    }
  });
  
  return location;
}