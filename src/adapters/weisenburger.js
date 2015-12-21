'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../models/Flat');

const COMPANY_ID = 'weisenburger';
const URL = 'http://www.weisenburger.de/kaufen-musterhaeuser-aktuelle-wohnobjekte/wohnungen-reihenhaeuser-doppelhaeuser-einfamilienhaeuser.html?id=13&price_sort=&display4=&display3=&no_cache=1&select=&category[0]=1&category[1]=2&category[2]=3&category[3]=4&category[4]=5&category[5]=6&category[6]=7&category[7]=8&status[0]=1&status[1]=2&status[2]=3&status[3]=4&status[4]=5&city[0]=Stadtvillen+Ettlingen&city[1]=Rheinstetten%2C+BauMeister-Carr%C3%A9&city[2]=Emmendingen-Windenreute%2C+Tunibergweg&city[3]=unser+Musterhaus&city[4]=Bischweier%2C+Junge+Reben&city[5]=Rastatt%2C+Wohnpark+am+Leopoldplatz&city[6]=Weinheim%2C+Gleiwitzerstra%C3%9Fe&city[7]=Dreieich-Sprendlingen%2C+&city[8]=Landau%2C+Vogesenstra%C3%9Fe&city[9]=Rastatt-Rheinau+';

module.exports.scrape = () => {
  console.log('Scraping', COMPANY_ID);
  return request(URL)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      
      $('#catalog_1 ul li').each((i, el) => {
        let text = $(el).find('.p2').text().trim();
        let price = $(el).find('.district_price').text().trim();
        let flatUrl = $(el).find('a').first().attr('href').trim();
        
        let flat = new Flat(COMPANY_ID, `${text} (${price})`, 'http://www.weisenburger.de/' + flatUrl);
        flats.push(flat);
      });
      
      return flats;
    });
}