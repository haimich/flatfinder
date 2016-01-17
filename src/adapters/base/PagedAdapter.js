'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class PagedAdapter extends Adapter {
  
  /**
   * @param object options (optional):
   *        @param string  startPage:         the page to start scraping
   *        @param string  urlSuffix:         pass optional suffix to add to baseUrl
   *        @param string  getUrlFromElement: a function that extracts the url from a cheerio object
   *        @param boolean useAbsoluteUrls:   whether the pages uses absolute urls for their flat links 
   *        @param string  encoding:          the character encoding used on the site
   */
  constructor(companyId, baseUrl, searchString, options) {
    super(companyId, baseUrl, searchString);
    
    let opts = options || {};
    
    this.startPage = opts.startPage;
    this.urlSuffix = opts.urlSuffix || '';
    this.getUrlFromElement = opts.getUrlFromElement || null;
    this.useAbsoluteUrls = opts.useAbsoluteUrls || false;
    this.encoding = opts.encoding || 'utf8';
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
        let foundOffers = false;
        
        $(this.searchString).each((i, el) => {
          foundOffers = true;
          let title = $(el).text().trim();
          
          if (title === '' || this.isBlacklisted(title)) {
            return;
          }
          
          let flatUrl = this.extractUrlFromElement($, el, this.getUrlFromElement);
          let url = this.extractUrl(flatUrl, this.baseUrl, this.urlSuffix, this.useAbsoluteUrls);
          
          let flat = new Flat(this.companyId, title, url);
          flats.push(flat);
        });
        
        if (foundOffers) {
          return this.scrapePage(page + 1, flats); // recurse
        } else {
          console.log(flats);
          return flats;
        }
      });
  }
}

module.exports = PagedAdapter;