'use strict';

let request = require('request-promise');
let cheerio = require('cheerio');
let Flat = require('../../models/Flat');

class FlowfactAdapter {
  constructor(companyId, baseUrl) {
    this.companyId = companyId;
    this.baseUrl = baseUrl;
    this.typeBlacklist = [ 'Praxisetage', 'Büro', 'Laden', 'Läden',
                           'Werkstatt', 'Lager', 'Verkaufsfläche',
                           'Industriehalle', 'Anwesen', 'Gaststätte', 
                           'Restaurant', 'Halle' ];
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
        
        $('div h3 a').each((i, el) => {
          foundOffers = true;
          let title = $(el).text().trim();
          let flatUrl = $(el).attr('href');
          
          let type = $(el).closest('div').find('ul li').first().text().trim();
          let price = $(el).closest('div').find('ul li').last().text().trim();
          if (this.containsBlacklistEntry(type) || this.isRentAppartment(price)) {
            return;
          }
          
          let flat = new Flat(this.companyId, `${title} (${price})`, flatUrl);
          flats.push(flat);
        });
        
        if (foundOffers) {
          return this.scrapePage(page + 1, flats); // recurse
        } else {
          console.log(flats);
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
  
  containsBlacklistEntry(text) {
    for (let entry of this.typeBlacklist) {
      if (text.indexOf(entry) >= 0) {
        return true;
      }
    }
  }
  
  isRentAppartment(text) {
    return text.indexOf('Miete') >= 0;
  }
}

module.exports = FlowfactAdapter;