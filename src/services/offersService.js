'use strict';

let repo = require('../repos/offersRepo');

module.exports.searchOffersByTitle = (title) => {
  return repo.searchOffersByTitle(title);
}

module.exports.offerExists = (companyId, title) => {
  return repo.offerExists(companyId, title);
}

module.exports.insertOffer = (offer) => {
  return repo.insertOffer(offer);
}
