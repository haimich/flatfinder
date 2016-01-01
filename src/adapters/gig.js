'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'gig';
const URL = 'http://www.giggmbh.de/';

/**
 * Scraping for gig works in two steps: first load the homepage and find out the
 * link for the flat overview (there are only specific links for offer pages that come
 * with the menu we need). Then load the specific page and scrape the homepage.
 */
module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return getImmopage()
    .then(immoUrl => scrapeImmopage(immoUrl));
}

function getImmopage() {
  return request(URL)
    .then(response => {
      let immoUrl;
      let $ = cheerio.load(response);
      
      $('a').each((i, el) => {
        if ($(el).text().trim() === 'Verkauf') {
          immoUrl = URL + $(el).attr('href');
        }
      });
      
      return immoUrl;
    });
}

function scrapeImmopage(immoUrl) {
  return request({
    uri: immoUrl,
    encoding: 'binary'
  })
    .then(immoPage => {
      let flats = [];
      let $ = cheerio.load(immoPage);
      
      let wohnenMenuActive = false;
      $('table[width=274] tr').each((i, el) => {
        let curText = $(el).text().trim();
        if (curText === 'Wohnen') {
          wohnenMenuActive = true;
          return;
        } else if (curText === 'Kapitalanlage') {
          wohnenMenuActive = false;
          return;
        } else if (curText === '') {
          return;
        }
        
        if (wohnenMenuActive) {
          let text = curText;
          let flatUrl = $(el).find('a').attr('href');
      
          let flat = new Flat(COMPANY_ID, text, URL + flatUrl);
          flats.push(flat);
        }
      });
      
      return flats;
    });
}