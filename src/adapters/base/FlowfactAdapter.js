'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');

class FlowfactAdapter extends Adapter {
  
  constructor(companyId, baseUrl) {
    super(companyId, baseUrl, 'div h3 a');
    
    this.urlSuffix = '';
    this.getUrlFromElement = null;
    this.useAbsoluteUrls = false;
    this.encoding = 'utf8';
    this.useragent = UA.FIREFOX;
  }
  
  scrape() {
    const STARTPAGE = 1;
    
    console.log('Scraping', this.companyId);
    let flats = [];
    return this.scrapePage(STARTPAGE, flats); 
  }
  
  scrapePage(page, flats) {
    console.log('Scraping', this.companyId, page);
    
    return request({
      uri: this.preparePageUrl(page),
      encoding: this.encoding,
      headers: {
        'User-Agent': this.useragent
      }
    }).then(response => {
        let $ = cheerio.load(response);
        let foundOffers = false;
        
        $(this.searchString).each((i, el) => {
          foundOffers = true;
          let title = $(el).text().trim();
          
          if (title === '' || this.isBlacklisted(this.titleBlacklist, title)) {
            return;
          }
          
          let flatUrl = this.extractUrlFromElement($, el, this.getUrlFromElement);
          let url = this.extractUrl(flatUrl, this.baseUrl, this.urlSuffix, this.useAbsoluteUrls);
          
          let type = $(el).closest('div').find('ul li').first().text().trim();
          let price = $(el).closest('div').find('ul li').last().text().trim();
          
          if (this.isBlacklisted(this.typeBlacklist, type) || 
              this.isRentAppartment(price) ||
              this.isBlacklisted(this.titleBlacklist, title)) {
            return;
          }
          
          let flat = new Flat(this.companyId, `${title} (${price})`, url);
          flats.push(flat);
        });
        
        if (foundOffers) {
          return this.scrapePage(page + 1, flats); // recurse
        } else {
          
          return flats;
        }
      })
      .catch((error) => {
        if (error.statusCode !== 404) {
          console.log('Got error', error);
        }
        return flats;
      });
  }
  
  isRentAppartment(text) {
    return text.indexOf('Miete') >= 0;
  }
}

module.exports = FlowfactAdapter;