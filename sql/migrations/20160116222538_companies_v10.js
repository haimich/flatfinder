
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'postbank', name: 'Postbank' }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'postbank').delete(),
  ]);
};
