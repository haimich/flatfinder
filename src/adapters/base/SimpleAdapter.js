'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class SimpleAdapter extends Adapter {
  /**
   * @param string companyId:        unique id from database
   * @param string baseUrl:          the url of the service
   * @param string searchString:     a jQuery style search string to extract the flat titles
   * @param object options (optional):
   *        @param string  urlSuffix:         pass optional suffix to add to baseUrl
   *        @param string  getUrlFromElement: a function that extracts the url from a cheerio object
   *        @param boolean useAbsoluteUrls:   whether the pages uses absolute urls for their flat links 
   *        @param string  encoding:          the character encoding used on the site
   */
  constructor(companyId, baseUrl, searchString, options) {
    super();
    
    let opts = options || {};
    
    this.companyId = companyId;
    this.baseUrl = baseUrl;
    this.searchString = searchString;
    
    this.urlSuffix = opts.urlSuffix || '';
    this.getUrlFromElement = opts.getUrlFromElement || null;
    this.useAbsoluteUrls = opts.useAbsoluteUrls || false;
    this.encoding = opts.encoding || 'utf8';
    this.useragent = opts.useragent || UA.FIREFOX;
  }
  
  scrape() {
    console.log('Scraping', this.companyId);
    
    return request({
      uri: this.baseUrl + this.urlSuffix,
      encoding: this.encoding,
      headers: {
        'User-Agent': this.useragent
      }
    }).then(response => {
        let flats = [];
        let $ = cheerio.load(response);
        
        $(this.searchString).each((i, el) => {
          let title = $(el).text().trim();
          
          if (title === '' || this.isBlacklisted(this.titleBlacklist, title)) {
            return;
          }
          
          let flatUrl = '';
          if (this.getUrlFromElement) {
            // url lies in another dom element
            flatUrl = this.getUrlFromElement($(el));
          } else {
            // url lies on same element as the title
            flatUrl = $(el).attr('href');
          }
          
          let url = this.extractUrl(flatUrl, this.baseUrl, this.urlSuffix, this.useAbsoluteUrls);
          
          let flat = new Flat(this.companyId, title, url);
          flats.push(flat);
        });
        
        console.log(flats, this.companyId);
        return flats;
      });
  }
}

module.exports = SimpleAdapter;