
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'pellrich', name: 'Pell-Rich' }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'pellrich').delete(),
  ]);
};
