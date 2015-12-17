var fs = require('fs');
var adapters = [];

function loadAdapters() {
  var names = fs.readdirSync('adapter');

  var dependencies =  names.map((value) => {
    return value.slice(0, value.length - 3);
  });
  
  dependencies.forEach((element) => {
    var dep = require('./adapter/' + element);
    adapters.push(dep);
  });
}

function scrapeAll() {
  return new Promise((resolve, reject) => {
    var results = [],
        errors = [];
    
    adapters.forEach((adapter, index) => {
      
      adapter.scrape()
        .then((res) => {
          results.push(res);
          
          console.log(adapters.length);
          if (index === adapters.length - 1) {
            if (errors.length >= 1) {
              reject(errors);
            } else {
              resolve(results);
            }
          }
        })
        .catch((err) => {
          errors.push(err);
          
          if (index === adapters.length - 1) {
            reject(errors);
          }
        });
    });
  });
}

loadAdapters(); // bootstrap

module.exports.scrapeAll = scrapeAll;