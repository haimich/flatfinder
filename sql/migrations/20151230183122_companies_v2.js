
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'spaka', name: 'Sparkassen Immocenter' }),
    knex('companies').insert({ id: 'spaka_haeuser', name: 'Sparkassen Immocenter Häuser' })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'spaka').delete(),
    knex('companies').where('id', 'spaka_haeuser').delete()
  ]);
};
