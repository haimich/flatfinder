
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'pferrer', name: 'Pferrer Rheinstetten' }),
    knex('companies').insert({ id: 'koch-rheinstetten', name: 'Immobilien Koch Rheinstetten' }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'pferrer').delete(),
    knex('companies').where('id', 'koch-rheinstetten').delete(),
  ]);
};
