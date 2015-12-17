'use strict';

let knexDb = require('knex');

let instance = null;

module.exports.getInstance = () => {
  if (instance === null) {
    
    try {
      instance = knexDb({
        client: 'pg',
        debug: true,
        connection: {
          connection: process.env.DATABASE_URL,
          database: 'd1ou8ff1cn9r17',
          timezone: 'UTC',
        },
        pool: {
          min: 0,
          max: 1,
        }
      });
    } catch (err) {
      console.log('ERROR', err.stack);
      throw err;
    }
  }
  
  return instance;
}