'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class HustherboldAdapter extends Adapter {
  
  constructor(companyId, baseUrl) {
    super(companyId, baseUrl, 'h2.nb-maklerTool-objectList-item-headline');
    
    this.startPage = 1;
    this.PER_PAGE = 9;
    this.urlSuffix = 'immobilienangebote/kaufen/seite/INSERTPAGE/';
    this.getUrlFromElement = ($el) => {
      return $el.closest('.offer').find('a').first().attr('href');
    };
    this.useAbsoluteUrls = false;
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
      uri: this.preparePageUrl(page, this.baseUrl + this.urlSuffix),
      encoding: this.encoding,
      headers: {
        'User-Agent': UA.FIREFOX
      }
    }).then(response => {
        let $ = cheerio.load(response);
        let offerCount = 0;
        
        $(this.searchString).each((i, el) => {
          offerCount++;
          
          let title = $(el).text().trim();
          
          if (title === '' || this.isBlacklisted(this.titleBlacklist, title)) {
            return;
          }
          
          let flatUrl = this.extractUrlFromElement($, el, this.getUrlFromElement);
          let url = this.extractUrl(flatUrl, this.baseUrl, this.urlSuffix, this.useAbsoluteUrls);
          
          let flat = new Flat(this.companyId, title, url);
          flats.push(flat);
        });
        
        if (offerCount === this.PER_PAGE) {
          return this.scrapePage(page + 1, flats); // recurse
        } else {
          console.log(flats);
          return flats;
        }
      });
  }
}

module.exports = HustherboldAdapter;