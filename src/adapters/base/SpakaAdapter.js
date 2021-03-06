'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class SpakaAdapter extends Adapter {
  
  constructor(companyId, baseUrl, searchString, options) {
    super(companyId, baseUrl, '.estateItem .titleContainer');
    
    this.urlSuffix = '';
    this.getUrlFromElement = ($el) => {
      return $el.parent().find('.imgContainer a').attr('href');
    };
    this.useAbsoluteUrls = true;
    this.encoding = 'utf8';
    
    this.PER_PAGE = 9;
    this.PRICE_REGEX = /Kaufpreis([0-9.,-]*).*/; 
  }
  
  scrape() {
    const STARTPAGE = 0;
    
    console.log('Scraping', this.companyId);
    let flats = [];
    return this.scrapePage(STARTPAGE, flats);
  }
  
  scrapePage(page, flats) {
    console.log('Scraping', this.companyId, page);
    
    return request({
      uri: this.preparePageUrl(page, this.baseUrl, this.urlSuffix),
      encoding: this.encoding,
      headers: {
        'User-Agent': UA.FIREFOX
      }
    }).then(response => {
        let $ = cheerio.load(response);
        let numberOfOffers = 0;
        
        $(this.searchString).each((i, el) => {
          numberOfOffers += 1;
          let title = $(el).text().trim();
          
          if (title === '' || this.isBlacklisted(title)) {
            return;
          }
          
          let flatUrl = this.extractUrlFromElement($, el, this.getUrlFromElement);
          let url = this.extractUrl(flatUrl, this.baseUrl, this.urlSuffix, this.useAbsoluteUrls);
          
          let priceText = $(el).parent().find('.showDetails div div').text();
          let price = this.PRICE_REGEX.exec(priceText)[1];
          
          let flat = new Flat(this.companyId, `${title} (${price})`, url);
          flats.push(flat);
        });
        
        if (numberOfOffers === this.PER_PAGE) {
          return this.scrapePage(page + this.PER_PAGE, flats); // recurse
        } else {
          return flats;
        }
      });
  }
}

module.exports = SpakaAdapter;