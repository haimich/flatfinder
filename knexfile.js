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
    },
    useNullAsDefault: true
  },
  
  production: {
    client: 'pg',
    debug: false,
    connection: process.env.DATABASE_URL,
    pool: {
      min: 0,
      max: 4
    },
    // searchPath: 'knex,public',
    migrations: {
      directory: './sql/migrations',
      tableName: 'knex_migrations'
    }
  }
  
};
