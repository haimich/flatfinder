'use strict';

let repo = require('../repos/dbRepo');

module.exports.searchOffersByTitle = (title) => {
  return repo.searchOffersByTitle(title);
}

module.exports.insertOffer = (offer) => {
  return repo.insertOffer(offer);
}
