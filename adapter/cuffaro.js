var request = require('request'),
	  cheerio = require('cheerio');
  
var url = 'http://immo.cuffaro-wohnkonzepte.de/immobilien/?post_type=immomakler_object&vermarktungsart=kauf&nutzungsart=wohnen&typ=&ort=&von-qm=95.00&bis-qm=145.00&von-zimmer=2.00&bis-zimmer=5.00&von-kaltmiete=0.00&bis-kaltmiete=100.00&von-kaufpreis=175000.00&bis-kaufpreis=475000.00';

module.exports.scrape = function() {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (! error) {
        var flats = [];
        var $ = cheerio.load(body);
        
        $('.property-details').each((i, el) => {
          var name = $(el).find('.property-title a').text().trim();
          var url = $(el).find('.property-title a').attr('href');
          var subtitle = $(el).find('.property-subtitle').text().trim();
          flats.push({
            name: `${name} (${subtitle})`,
            url: url
          });
        });
        
        resolve(flats);
      } else {
        reject('We’ve encountered an error: ' + error);
      }
    });
  });
}