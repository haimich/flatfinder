
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'avallone', name: 'Avallone' }),
    knex('companies').insert({ id: 'can', name: 'Can Immobilien' }),
    knex('companies').insert({ id: 'kuehn', name: 'Kühn Immobilien' }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'avallone').delete(),
    knex('companies').where('id', 'can').delete(),
    knex('companies').where('id', 'kuehn').delete(),
  ]);
};
