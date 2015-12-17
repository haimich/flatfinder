'use strict';

let knexDb = require('knex');

let instance = null;

module.exports.getInstance = () => {
  if (instance === null) {
    
    instance = knexDb({
      client: 'pg',
      debug: false,
      connection: {
        connection: process.env.DATABASE_URL,
        database: 'd1ou8ff1cn9r17',
        timezone: 'UTC',
      }
    });
  }
  
  return instance;
}