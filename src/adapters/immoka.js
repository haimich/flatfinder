'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'immoka';
const URL = 'http://www.immoka.net/immoka/ctrl/11/11/?11_pmt=1;2&11_arf=-1.0&11_art=-1.0&11_mtb=1&11_mtr=-1&11_mth=-1&11_mtl=-1&11_prf=-1.0&11_prt=-1.0&11_arf=-1.0&11_art=-1.0&11_frs=-1&11_blt=-1timeLimitedLiving11_tll=-1&11_zl=&11_idp=-1&11_idcs=-1&11_idc=-1&11_navp=1';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#content a.listtitle').each((i, el) => {
        let title = $(el).text().trim();
        let flatUrl = $(el).attr('href');
        
        let flat = new Flat(COMPANY_ID, title, 'http://www.immoka.net' + flatUrl);
        flats.push(flat);
      });
      
      return flats;
    }); 
}