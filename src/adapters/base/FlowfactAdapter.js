'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');

class FlowfactAdapter extends Adapter {
  constructor(companyId, baseUrl) {
    super(companyId, baseUrl, 'div h3 a');
  }
  
  scrape() {
    const STARTPAGE = 1;
    
    console.log('Scraping', this.companyId);
    let flats = [];
    return this.scrapePage(STARTPAGE, flats); 
  }
  
  scrapePage(page, flats) {
    console.log('Scraping', this.companyId, page);
    let url = this.preparePageUrl(page);

    return request(url)
      .then(response => {
        let $ = cheerio.load(response);
        let foundOffers = false;
        
        $(this.searchString).each((i, el) => {
          foundOffers = true;
          let title = $(el).text().trim();
          let flatUrl = $(el).attr('href');
          
          let type = $(el).closest('div').find('ul li').first().text().trim();
          let price = $(el).closest('div').find('ul li').last().text().trim();
          
          if (this.isBlacklisted(this.typeBlacklist, type) || 
              this.isRentAppartment(price) ||
              this.isBlacklisted(this.titleBlacklist, title)) {
            return;
          }
          
          let flat = new Flat(this.companyId, `${title} (${price})`, flatUrl);
          flats.push(flat);
        });
        
        if (foundOffers) {
          return this.scrapePage(page + 1, flats); // recurse
        } else {
          
          if (flats.length === 0) {
            console.log(flats, this.companyId);
          }
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
  
  preparePageUrl(page) {
    return this.baseUrl.replace('INSERTPAGE', page)
  }
  
  isRentAppartment(text) {
    return text.indexOf('Miete') >= 0;
  }
}

module.exports = FlowfactAdapter;