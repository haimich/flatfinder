let dbHelper = require('../helpers/db');

module.exports.hasTable = () => {
  return dbHelper.getInstance().hasTable('test_table');
}