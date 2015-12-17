'use strict';

let dbHelper = require('../helpers/db');

module.exports.searchOffersByTitle = (title) => {
  return dbHelper.getInstance()
    .select('*')
    .from('offers')
    .where('title', title);
}

module.exports.insertOffer = (offer) => {
  return dbHelper.getInstance()
    .insert(offer)
    .into('offers');
}