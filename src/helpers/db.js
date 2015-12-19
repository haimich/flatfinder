'use strict';

let knexDb = require('knex');

let instance = null;

module.exports.getInstance = () => {
  if (instance === null) {
    
    instance = knexDb({
      client: 'sqlite3',
      debug: false,
      connection: {
        filename: './dev.db'
      }
    });
    // instance = knexDb({
    //   client: 'pg',
    //   debug: true,
    //   connection: process.env.DATABASE_URL,
    //   pool: {
    //     min: 0,
    //     max: 1,
    //   }
    // });
  }
  
  return instance;
}