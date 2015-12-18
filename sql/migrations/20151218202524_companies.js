
exports.up = (knex, Promise) => {
  return createTable(knex)
    .then(() => insert(knex, 'cufaro', 'Cuffaro', 'http://www.cuffaro-immobilien.de/immobilien/'))
    .then(() => insert(knex, 'km', 'Köhler & Meinzer', 'http://www.koehler-und-meinzer.de/aktuelles/im-verkauf/'))
    .then(() => insert(knex, 'weisenburger', 'Weisenburger', 'http://www.weisenburger.de/kaufen-musterhaeuser-aktuelle-wohnobjekte/wohnungen-reihenhaeuser-doppelhaeuser-einfamilienhaeuser.html?no_cache=1'))
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
    table.string('url');
    
    table.index(['id'], 'companies_id_index');
  });
}

function insert(knex, id, name, url) {
  return knex('companies').insert({ id, name, url });
}