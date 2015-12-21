'use strict';

let dbHelper = require('../helpers/db');

module.exports.searchOffersByTitle = (title) => {
  return dbHelper.getInstance()
    .select('*')
    .from('offers')
    .join('companies', 'offers.company_id', '=', 'companies.id')
    .where('title', title);
}

module.exports.offerExists = (companyId, title) => {
  return new Promise((resolve, reject) => {
    dbHelper.getInstance()
      .count('*')
      .from('offers')
      .where('company_id', companyId)
      .andWhere('title', title)
      .then(result => {
        console.log('RESULT:::', result);
        if (result[0]['count(*)'] === 0) {
          resolve(false);
        } else {
          resolve(true);
        }
      })
      .catch(reject);
  });
}

module.exports.insertOffer = (companyId, title, url) => {
  return dbHelper.getInstance()
    .insert({
      company_id: companyId,
      title,
      url
    })
    .into('offers');
}