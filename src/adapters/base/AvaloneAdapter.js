'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class AvaloneAdapter extends Adapter {

  constructor(companyId, baseUrl) {
    super(companyId, baseUrl, '.FFestateview-default-overview-list a');
    
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
      uri: this.preparePageUrl(page, this.baseUrl, this.urlSuffix),
      encoding: this.encoding,
      headers: {
        'User-Agent': UA.FIREFOX
      }
    }).then(response => {
        let $ = cheerio.load(response);
        let foundOffers = false;
        
        $(this.searchString).each((i, el) => {
          foundOffers = true;
          let title = $(el).text().trim();
          
          if (title === '' || this.isBlacklisted(title)) {
            console.log("blacklisted", title)
            return;
          }
          
          let flatUrl = this.extractUrlFromElement($, el, this.getUrlFromElement);
          let url = this.extractUrl(flatUrl, this.baseUrl, this.urlSuffix, this.useAbsoluteUrls);
          
          let type = $(el).closest('div').find('ul li').first().text().trim();
          let price = $(el).closest('div').find('ul li').last().text().trim();
          
          if (this.isBlacklisted(type) || 
              this.isBlacklisted(price) ||
              this.isBlacklisted(title)) {
                console.log("Blacklisted 2")
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
      });
  }
}

module.exports = AvaloneAdapter;