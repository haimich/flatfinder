'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class GebakaAdapter extends Adapter {
  
  constructor(companyId, baseUrl) {
    super(companyId, baseUrl, '#index2content > div');
    
    this.urlSuffix = '';
    this.getUrlFromElement = null;
    this.useAbsoluteUrls = false;
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
          if ($(el).css('width') !== '400px') {
            return;
          }
          
          let title = $(el).find('.ueberschrift').text().trim();
          
          if (title === '' || this.isBlacklisted(this.titleBlacklist, title)) {
            return;
          }
          
          let flat = new Flat(this.companyId, title, this.baseUrl);
          flats.push(flat);
        });
        
        return flats;
      });
  }
  
}

module.exports = GebakaAdapter;