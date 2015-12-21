'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'immoka';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  let flats = [];
  return scrapePage(1, flats);
}

function scrapePage(page, flats) {
  let url = `http://www.immoka.net/immoka/ctrl/11/11/?11_pmt=3&11_arf=-1.0&11_art=-1.0&11_mtb=1&11_mtr=-1&11_mth=-1&11_mtl=-1&11_prf=-1.0&11_prt=-1.0&11_arf=-1.0&11_art=-1.0&11_frs=-1&11_blt=-1timeLimitedLiving11_tll=0&11_zl=&11_idp=-1&11_idcs=-1&11_idc=-1&11_navp=${page}`;
  console.log('Scraping', page);
  
  return request(url)
    .then(response => {
      let $ = cheerio.load(response);
      let foundOffers = false;
      
      $('#content a.listtitle').each((i, el) => {
        foundOffers = true;
        let title = $(el).text().trim();
        let flatUrl = $(el).attr('href');
        
        let flat = new Flat(COMPANY_ID, title, 'http://www.immoka.net' + flatUrl);
        flats.push(flat);
      });
      
      if (foundOffers) {
        return scrapePage(page + 1, flats); // recurse
      } else {
        return flats;
      }
    })
}