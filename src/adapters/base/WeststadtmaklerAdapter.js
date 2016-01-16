'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class WeststadtmaklerAdapter extends Adapter {
  
  constructor(companyId, baseUrl) {
    super(companyId, baseUrl, '.standard-white-text .container > hr');
    
    this.urlSuffix = 'immobilien/objekte.htm';
    this.getUrlFromElement = null;
    this.useAbsoluteUrls = true;
    this.encoding = 'utf8';
  }
  
  scrape() {
    console.log('Scraping', this.companyId);
    
    return request({
      uri: this.baseUrl + this.urlSuffix,
      encoding: this.encoding,
      headers: {
        'User-Agent': UA.FIREFOX
      }
    }).then(response => {
        let flats = [];
        let $ = cheerio.load(response);
        
        $(this.searchString).each((i, el) => {
          let next = $(el).next();
          
          if (next.find('a').length === 1) {
            let title = next.find('a').text().trim();
            
            if (title === '' || this.isBlacklisted(this.titleBlacklist, title)) {
              return;
            }
            
            let flatUrl = next.find('a').attr('href');
            
            if (flatUrl.startsWith('../')) {
              flatUrl = flatUrl.replace('../', this.baseUrl);
            }
            
            let url = this.extractUrl(flatUrl, this.baseUrl, this.urlSuffix, this.useAbsoluteUrls);
            
            let description = next.next();
            if (description.text().indexOf('schon verkauft') === -1) {
              let flat = new Flat(this.companyId, title, url);
              flats.push(flat);
            }
          }
        });
        
        return flats;
      });
  }
  
}

module.exports = WeststadtmaklerAdapter;