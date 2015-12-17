module.exports = {

  development: {
    client: 'sqlite3',
    connection: {
      filename: './dev.db'
    },
    migrations: {
      directory: './sql/migrations',
      tableName: 'knex_migrations'
    }
  }

};
