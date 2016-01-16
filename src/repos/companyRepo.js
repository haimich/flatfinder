'use strict';

let dbHelper = require('../providers/db');

module.exports.getCompanies = () => {
  return dbHelper.getInstance()
    .select('*')
    .from('companies');
}