'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class GigAdapter extends Adapter {
  
  constructor(companyId, baseUrl) {
    super(companyId, baseUrl, 'table[width=274] tr');
    
    this.urlSuffix = '';
    this.getUrlFromElement = null;
    this.useAbsoluteUrls = false;
    this.encoding = 'binary';
  }
  
  /**
   * Scraping for gig works in two steps: first load the homepage and find out the
   * link for the flat overview (there are only specific links for offer pages that come
   * with the menu we need). Then load the specific page and scrape the homepage.
   */
  scrape() {
    console.log('Scraping', this.companyId);
    
    return this.getImmopage()
      .then(immoUrl => this.scrapeImmopage(immoUrl));
  }
  
  scrapeImmopage(url) {
    return request({
      uri: url,
      encoding: this.encoding,
      headers: {
        'User-Agent': UA.FIREFOX
      }
    }).then(response => {
      let flats = [];
      let $ = cheerio.load(response);
      let wohnenMenuActive = false;
      
      $(this.searchString).each((i, el) => {
        let curText = $(el).text().trim();
        if (curText === 'Wohnen') {
          wohnenMenuActive = true;
          return;
        } else if (curText === 'Kapitalanlage') {
          wohnenMenuActive = false;
          return;
        } else if (curText === '') {
          return;
        }
        
        if (wohnenMenuActive) {
          let title = curText;
          
          if (title === '' || this.isBlacklisted(title)) {
            return;
          }
          
          let flatUrl = $(el).find('a').attr('href');
      
          let flat = new Flat(this.companyId, title, this.baseUrl + flatUrl);
          flats.push(flat);
        }
      });
      
      return flats;
    });
  }
  
  getImmopage() {
    return request(this.baseUrl)
      .then(response => {
        let immoUrl;
        let $ = cheerio.load(response);
        
        $('a').each((i, el) => {
          if ($(el).text().trim() === 'Verkauf') {
            immoUrl = this.baseUrl + $(el).attr('href');
          }
        });
        
        return immoUrl;
      });
  }
}

module.exports = GigAdapter;