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
    this.useAbsoluteUrls = opts.useAbsoluteUrls || false;
    this.encoding = opts.encoding || 'utf8';
  }
  
  scrape() {
    console.log('Scraping', this.companyId);
    
    return request({
      uri: this.baseUrl + this.urlSuffix,
      encoding: this.encoding
    }).then(response => {
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
      if (this.useAbsoluteUrls) {
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