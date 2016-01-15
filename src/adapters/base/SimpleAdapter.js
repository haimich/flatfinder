'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../../models/Flat');

class FlowfactAdapter {
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
    let opts = options || {};
    
    this.companyId = companyId;
    this.baseUrl = baseUrl;
    this.searchString = searchString;
    
    this.urlSuffix = opts.urlSuffix || '';
    this.getUrlFromElement = opts.getUrlFromElement || null;
    this.useAbsoluteUrls = opts.useAbsoluteUrls || false;
    this.encoding = opts.encoding || 'utf8';
  }
  
  scrape() {
    console.log('Scraping', this.companyId);
    
    return request({
      uri: this.baseUrl + this.urlSuffix,
      encoding: this.encoding
    }).then(response => {
        let flats = [];
        let $ = cheerio.load(response);
        
        $(this.searchString).each((i, el) => {
          let title = $(el).text().trim();
          
          let flatUrl = '';
          if (this.getUrlFromElement) {
            // url lies in another dom element
            flatUrl = this.getUrlFromElement($(el));
          } else {
            // url lies on same element as the title
            flatUrl = $(el).attr('href');
          }
          
          let url = this.extractUrl(flatUrl);
          
          let flat = new Flat(this.companyId, title, url);
          flats.push(flat);
        });
        console.log(flats);
        return flats;
      }); 
  }
  
  extractUrl(text) {
    let url = '';
    
    if (text !== undefined && text !== '') {
      if (this.useAbsoluteUrls) {
        url = text;
      } else {
        url = this.baseUrl + text;
      }
    } else {
      url = this.baseUrl + this.urlSuffix;
    }
    
    return url;
  }
}

module.exports = FlowfactAdapter;