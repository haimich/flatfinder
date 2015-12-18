'use strict';

let dbHelper = require('../helpers/db');

module.exports.searchOffersByTitle = (title) => {
  return dbHelper.getInstance()
    .select('*')
    .from('offers')
    .join('companies', 'offers.company_id', '=', 'companies.id')
    .where('title', title);
}

module.exports.hasOffer = (companyId, title) => {
  return new Promise((resolve, reject) => {
    dbHelper.getInstance()
      .count('*')
      .from('offers')
      .where('company_id', companyId)
      .andWhere('title', title)
      .then(result => {
        if (result[0]['count(*)'] === 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch(reject);
  });
}

module.exports.insertOffer = (offer) => {
  return dbHelper.getInstance()
    .insert(offer)
    .into('offers');
}