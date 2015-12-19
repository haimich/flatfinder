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
  }

};
