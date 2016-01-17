'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let urlModule = require('url');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');
let UA = require('../../models/UserAgent');

class ImmokaAdapter extends Adapter {
  
  constructor(companyId, baseUrl, searchString, options) {
    super(companyId, baseUrl, '#content a.listtitle');
    
    this.startPage = 1;
    this.urlSuffix = '/immoka/ctrl/11/11/?11_pmt=3&11_arf=-1.0&11_art=-1.0&11_mtb=1&11_mtr=-1&11_mth=-1&11_mtl=-1&11_prf=-1.0&11_prt=-1.0&11_arf=-1.0&11_art=-1.0&11_frs=-1&11_blt=-1timeLimitedLiving11_tll=0&11_zl=&11_idp=-1&11_idcs=-1&11_idc=-1&11_navp=INSERTPAGE';
    this.getUrlFromElement = null;
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
          
          let flat = new Flat(this.companyId, title, this.cleanupUrl(url));
          flats.push(flat);
        });
        
        if (foundOffers) {
          return this.scrapePage(page + 1, flats); // recurse
        } else {
          return flats;
        }
      });
  }
  
  /**
   * Remove jsessionid from url so on the next run we can identify
   * this url as already visited.
   */
  cleanupUrl(url) {
    let urlObj = urlModule.parse(url);
    let pos = urlObj.pathname.indexOf(';jsessionid');
    urlObj.pathname = urlObj.pathname.slice(0, pos);
    return urlModule.format(urlObj);
  }
}

module.exports = ImmokaAdapter;