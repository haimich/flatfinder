
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'avallone', name: 'Avallone' }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'avallone').delete(),
  ]);
};
