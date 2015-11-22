var request = require('request'),
	  cheerio = require('cheerio');
  
var url = 'http://www.koehler-und-meinzer.de/aktuelles/im-verkauf/';

module.exports.scrape = function() {
  return new Promise((resolve, reject) => {
    request(url, function (error, response, body) {
      if (!error) {
        var flats = [];
        var $ = cheerio.load(body);
        
        $('form .cc-m-form-checkgroup label div').each((i, el) => {
          var category = $(el).text().trim();
          if (category === 'Wohnhäuser:') {
            $(el).parent().parent().find('.cc-m-form-checkable-vertical label').each((i, el) => {
              var flat = $(el).text().trim();
              flats.push({ name: flat, url: url });
            });
          }
        });
        
        resolve(flats);
      } else {
        reject('We’ve encountered an error: ' + error);
      }
    });
  });
}