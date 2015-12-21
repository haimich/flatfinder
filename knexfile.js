module.exports = {

  development: {
    client: 'sqlite3',
    debug: false,
    connection: {
      filename: './dev.db'
    },
    migrations: {
      directory: './sql/migrations',
      tableName: 'knex_migrations'
    },
    seeds: {
      directory: './sql/seeds'
    }
  },
  
  production: {
    client: 'pg',
    debug: false,
    connection: process.env.PG_CONNECTION_STRING,
    pool: {
      min: 1,
      max: 3
    }
    // searchPath: 'knex,public',
    migrations: {
      directory: './sql/migrations',
      tableName: 'knex_migrations'
    }
  }
  
};
