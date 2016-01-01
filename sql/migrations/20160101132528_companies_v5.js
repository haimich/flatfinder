
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'gebaka', name: 'Gebaka' })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'gebaka').delete()
  ]);
};
