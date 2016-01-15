'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../../models/Flat');

class FlowfactAdapter {
  constructor(companyId, baseUrl, searchString, options) {
    let opts = options || {};
    
    this.companyId = companyId;
    this.baseUrl = baseUrl;
    this.searchString = searchString;
    
    this.urlSuffix = opts.urlSuffix || '';
    this.hasAbsoluteUrls = opts.hasAbsoluteUrls || false;
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
          
          let url = this.extractUrl(flatUrl);
          
          let flat = new Flat(this.companyId, title, url);
          flats.push(flat);
        });
        console.log(flats);
        return flats;
      }); 
  }
  
  extractUrl(text) {
    let url = '';
    
    if (text !== undefined && text !== '') {
      if (this.hasAbsoluteUrls) {
        url = text;
      } else {
        url = this.baseUrl + text;
      }
    } else {
      url = this.baseUrl + this.urlSuffix;
    }
    
    return url;
  }
}

module.exports = FlowfactAdapter;