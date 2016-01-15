'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../../models/Flat');

class FlowfactAdapter {
  constructor(companyId, baseUrl, urlSuffix, searchString) {
    this.companyId = companyId;
    this.baseUrl = baseUrl;
    this.urlSuffix = urlSuffix || '';
    this.searchString = searchString;
  }
  
  scrape() {
    console.log('Scraping', this.companyId);
    
    return request(this.baseUrl + this.urlSuffix)
      .then(response => {
        let flats = [];
        let $ = cheerio.load(response);
        
        $(this.searchString).each((i, el) => {
          let title = $(el).text().trim();
          let flatUrl = $(el).attr('href');
          
          let flat = new Flat(this.companyId, title, this.baseUrl + flatUrl);
          flats.push(flat);
        });
        console.log(flats);
        return flats;
      }); 
  }
}

module.exports = FlowfactAdapter;