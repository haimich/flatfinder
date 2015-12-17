'use strict';

let request = require('request-promise'),
	  cheerio = require('cheerio');
  
let url = 'http://immo.cuffaro-wohnkonzepte.de/immobilien/?post_type=immomakler_object&vermarktungsart=kauf&nutzungsart=wohnen&typ=&ort=&von-qm=95.00&bis-qm=145.00&von-zimmer=2.00&bis-zimmer=5.00&von-kaltmiete=0.00&bis-kaltmiete=100.00&von-kaufpreis=175000.00&bis-kaufpreis=475000.00';

module.exports.scrape = () => {
  return request(url)
    .then(response => {
      let flats = [];
      let $ = cheerio.load(response.body);
      
      $('.property-details').each((i, el) => {
        let name = $(el).find('.property-title a').text().trim();
        let url = $(el).find('.property-title a').attr('href');
        let subtitle = $(el).find('.property-subtitle').text().trim();
        flats.push({
          name: `${name} (${subtitle})`,
          url: url
        });
      });
      
      return flats;
    });
}