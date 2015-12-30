
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'weststadtmakler', name: 'Weststadtmakler' })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'weststadtmakler').delete()
  ]);
};
