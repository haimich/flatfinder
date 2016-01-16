'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class SimpleAdapter extends Adapter {
  /**
   * @param object options (optional):
   *        @param string  urlSuffix:         pass optional suffix to add to baseUrl
   *        @param string  getUrlFromElement: a function that extracts the url from a cheerio object
   *        @param boolean useAbsoluteUrls:   whether the pages uses absolute urls for their flat links 
   *        @param string  encoding:          the character encoding used on the site
   */
  constructor(companyId, baseUrl, searchString, options) {
    super(companyId, baseUrl, searchString);
    
    let opts = options || {};
    
    this.urlSuffix = opts.urlSuffix || '';
    this.getUrlFromElement = opts.getUrlFromElement || null;
    this.useAbsoluteUrls = opts.useAbsoluteUrls || false;
    this.encoding = opts.encoding || 'utf8';
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
          let title = $(el).text().trim();
          
          if (title === '' || this.isBlacklisted(this.titleBlacklist, title)) {
            return;
          }
          
          let flatUrl = this.extractUrlFromElement($, el, this.getUrlFromElement);
          let url = this.extractUrl(flatUrl, this.baseUrl, this.urlSuffix, this.useAbsoluteUrls);
          
          let flat = new Flat(this.companyId, title, url);
          flats.push(flat);
        });
        
        return flats;
      });
  }
}

module.exports = SimpleAdapter;