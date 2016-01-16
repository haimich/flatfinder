'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class KmAdapter extends Adapter {
  
  constructor(companyId, baseUrl) {
    super(companyId, baseUrl, 'form .cc-m-form-checkgroup label div');
    
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
          let category = $(el).text().trim();
          if (category !== 'Wohnhäuser:') {
            return;
          }
          
          $(el).parent().parent().find('.cc-m-form-checkable-vertical label').each((i, el) => {
            let title = $(el).text().trim();
          
            if (title === '' || this.isBlacklisted(this.titleBlacklist, title)) {
              return;
            }
            
            let flat = new Flat(this.companyId, title, this.baseUrl);
            flats.push(flat);
            });
        });
        
        return flats;
      });
  }
  
}

module.exports = KmAdapter;