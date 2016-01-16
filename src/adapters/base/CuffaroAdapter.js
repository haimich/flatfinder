'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class PagedAdapter extends Adapter {

  constructor(companyId, baseUrl, searchString, options) {
    super(companyId, baseUrl, '.property-details .property-title a');
    
    this.startPage = 1;
    this.urlSuffix = '';
    this.getUrlFromElement = null;
    this.useAbsoluteUrls = true;
    this.encoding = 'utf8';
  }
  
  scrape() {
    console.log('Scraping', this.companyId);
    let flats = [];
    return this.scrapePage(this.startPage, flats);
  }
  
  scrapePage(page, flats) {
    console.log('Scraping', this.companyId, page);
    
    return request({
      uri: this.preparePageUrl(page, this.baseUrl),
      encoding: this.encoding,
      headers: {
        'User-Agent': UA.FIREFOX
      }
    }).then(response => {
        let $ = cheerio.load(response);
        
        $(this.searchString).each((i, el) => {
          let title = $(el).text().trim();
          
          if (title === '' || this.isBlacklisted(this.titleBlacklist, title)) {
            return;
          }
          
          let flatUrl = this.extractUrlFromElement($, el, this.getUrlFromElement);
          let url = this.extractUrl(flatUrl, this.baseUrl, this.urlSuffix, this.useAbsoluteUrls);
          
          let flat = new Flat(this.companyId, title, url);
          flats.push(flat);
        });
        
        return this.scrapePage(page + 1, flats); // recurse
      })
      .catch((error) => {
        if (error.statusCode !== 404) {
          console.log('Got error', error, error.stack);
        }
        
        return flats; // we made it
      });
  }
}

module.exports = PagedAdapter;