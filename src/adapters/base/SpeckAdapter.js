'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class SpeckAdapter extends Adapter {
  
  constructor(companyId, baseUrl) {
    super(companyId, baseUrl, '#content_area div.clearover');
    
    this.urlSuffix = '';
    this.getUrlFromElement = ($el) => {
      return $el.parent().find('a').attr('href');
    }
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
          let title = $(el).find('h2').text().trim();
          
          if (title === '' || this.isBlacklisted(this.titleBlacklist, title) || this.isSold($, el)) {
            return;
          }
          
          let flatUrl = this.extractUrlFromElement($, el, this.getUrlFromElement);
          let url = this.extractUrl(flatUrl, this.baseUrl, this.urlSuffix, this.useAbsoluteUrls);
          
          let flat = new Flat(this.companyId, title, url);
          flats.push(flat);
        });
        
        console.log(flats, this.companyId);
        return flats;
      });
  }
  
  isSold($, el) {
    let isSold = false;
    $(el).find('p strong').each((i, el) => {
      
      if ($(el).text().trim().indexOf('V E R K A U F T') !== -1) {
        isSold = true;
      }
    });
    return isSold;
  }
}

module.exports = SpeckAdapter;