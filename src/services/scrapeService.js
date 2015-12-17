'use strict';

let fs = require('fs');
let path = require('path');
let repo = require('../repos/dbRepo');

let adapters = [];

function loadAdapters() {
  let names = fs.readdirSync(path.join(__dirname, '../adapters'));

  let dependencies = names.map((value) => {
    return value.slice(0, value.length - 3);
  });
  
  dependencies.forEach((element) => {
    let dep = require('../adapters/' + element);
    adapters.push(dep);
  });
}

module.exports.scrapeAll = () => {
  return new Promise((resolve, reject) => {
    let results = [],
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

module.exports.searchOffersByTitle = (title) => {
  return repo.searchOffersByTitle(title);
}

module.exports.insertOffer = (offer) => {
  return repo.insertOffer(offer);
}

loadAdapters(); // bootstrap