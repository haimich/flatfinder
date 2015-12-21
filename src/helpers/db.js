'use strict';

let knexDb = require('knex');
let knexFile = require('../../knexfile');
let nconf = require('./configuration').getInstance();

let instance = null;

module.exports.getInstance = () => {
  if (instance === null) {
    let options = knexFile[nconf.get('NODE_ENV')];
    
    instance = knexDb(options);
  }
  
  return instance;
}