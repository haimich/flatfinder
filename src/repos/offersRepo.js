'use strict';

let dbHelper = require('../helpers/db');

module.exports.searchOffersByTitle = (title) => {
  return dbHelper.getInstance()
    .select('*')
    .from('offers')
    .join('companies', 'offers.company_id', '=', 'companies.id')
    .where('title', title);
}

module.exports.offerExists = (companyId, title, url) => {
  return new Promise((resolve, reject) => {
    dbHelper.getInstance()
      .count('*')
      .from('offers')
      .where('company_id', companyId)
      .andWhere('title', title)
      .andWhere('url', url)
      .then(result => {
        if (hasEntries(result)) {
          resolve(true);
        } else {
          resolve(false);
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

function hasEntries(result) {
  let countResult = result[0];
  
  if (countResult['count(*)'] !== undefined) {        //sqlite style
    let count = Number(countResult['count(*)']);
    console.log('COUNT', count);
    return count >= 1; 
  } else if (countResult['count'] !== undefined) {   //postgres style
    let count = Number(countResult['count']);
    return count >= 1;
  } else {
    throw Error('No valid response', result);
  }
}