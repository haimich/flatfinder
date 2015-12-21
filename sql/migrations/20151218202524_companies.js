
exports.up = (knex, Promise) => {
  return createTable(knex)
    .then(() => insert(knex, 'cuffaro', 'Cuffaro'))
    .then(() => insert(knex, 'km', 'Köhler & Meinzer'))
    .then(() => insert(knex, 'weisenburger', 'Weisenburger'))
    .then(() => insert(knex, 'throm', 'Throm'))
    .then(() => insert(knex, 'volkswohnung', 'Volkswohnung'))
    .then(() => insert(knex, 'artekt', 'Artekt'))
    .then(() => insert(knex, 'kassel', 'Kassel'));
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('companies')
  ]);
};

function createTable(knex) {
  return knex.schema.createTable('companies', (table) => {
    table.string('id').primary();
    table.string('name');
    
    table.index(['id'], 'companies_id_index');
  });
}

function insert(knex, id, name) {
  return knex('companies').insert({ id, name });
}