
exports.up = (knex, Promise) => {
  return Promise.all([
    knex.schema.createTable('offers', (table) => {
      table.bigIncrements('id').primary().unsigned();
      table.string('company_id');
      table.string('title');
      table.string('url');
      
      table.timestamp('created_at').defaultTo(knex.fn.now());
      
      table.index(['id'], 'index_id');
    })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('offers')
  ]);
};