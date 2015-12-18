'use strict';

let repo = require('../repos/companyRepo');

module.exports.getCompanies = () => {
  return repo.getCompanies();
}