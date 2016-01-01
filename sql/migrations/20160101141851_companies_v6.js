
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'gig', name: 'GIG GmbH' })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'gig').delete()
  ]);
};
