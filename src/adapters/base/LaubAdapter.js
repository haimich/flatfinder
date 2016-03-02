'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class LaubAdapter extends Adapter {
  
  constructor(companyId, baseUrl, searchString, options) {
    super(companyId, baseUrl, '.art-postcontent table[width=620] tr h3');
    
    this.startPage = 0;
    this.urlSuffix = '';
    this.getUrlFromElement = null;
    this.useAbsoluteUrls = true;
    this.encoding = 'binary';
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
            return;
          }
          
          let table = $(el).closest('table');
          let flatUrl = $(table).find('a').attr('href');
          let url = this.extractUrl(flatUrl, this.baseUrl, this.urlSuffix, this.useAbsoluteUrls);
          let location = this.scrapeLocation($, table);
          
          let flat = new Flat(this.companyId, location + ': ' + title, url);
          flats.push(flat);
        });
        
        if (foundOffers) {
          return this.scrapePage(page + 1, flats); // recurse
        } else {
          return flats;
        }
      });
  }
  
  scrapeLocation($, element) {
    let location = '';
    let gotOrt = false;
    
    element.find('td').each((i, el) => {
      let trText = $(el).text().trim();
      
      if (trText === 'Ort:') {
        gotOrt = true;
        return;
      }
      
      if (gotOrt) {
        location = trText;
        gotOrt = false;
      }
    });
    
    return location;
  }
}

module.exports = LaubAdapter;