'use strict';

let dbHelper = require('../helpers/db');

module.exports.getCompanies = () => {
  return dbHelper.getInstance()
    .select('*')
    .from('companies');
}