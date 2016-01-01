
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'immotrend', name: 'Immotrend' })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'immotrend').delete()
  ]);
};
