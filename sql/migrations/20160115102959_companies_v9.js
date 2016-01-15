
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'leitgieb', name: 'Leitgieb Immobilien' }),
    knex('companies').insert({ id: 'engelvoelkers', name: 'Engel & Völkers' }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'leitgieb').delete(),
    knex('companies').where('id', 'engelvoelkers').delete(),
  ]);
};
