
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'sekundus', name: 'Sekundus' }),
    knex('companies').insert({ id: 'speck', name: 'Speck Immobilien' }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'sekundus').delete(),
    knex('companies').where('id', 'speck').delete(),
  ]);
};
