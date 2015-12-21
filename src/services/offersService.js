'use strict';

let repo = require('../repos/offersRepo');

module.exports.searchOffersByTitle = (title) => {
  return repo.searchOffersByTitle(title);
}

module.exports.offerExists = (companyId, title, url) => {
  return repo.offerExists(companyId, title, url);
}

module.exports.insertOffer = (companyId, title, url) => {
  return repo.insertOffer(companyId, title, url);
}
