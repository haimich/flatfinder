'use strict';

let dbHelper = require('../helpers/db');

module.exports.hasTable = () => {
  return dbHelper.getInstance();
}