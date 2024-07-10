
exports.up = (knex) => {
  return Promise.all([
    knex.schema.createTable('offers', (table) => {
      table.bigIncrements('id').primary().unsigned();
      table.text('company_id');
      table.text('title');
      table.text('url', 'mediumtext');
      
      table.timestamp('created_at').defaultTo(knex.fn.now());
      
      table.index(['id'], 'index_id');
    })
  ]);
};

exports.down = (knex) => {
  return Promise.all([
    knex.schema.dropTable('offers')
  ]);
};