
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'besserwohnen', name: 'Besser Wohnen in Karlsruhe' }),
    knex('companies').insert({ id: 'haitz', name: 'Haitz' }),
    knex('companies').insert({ id: 'suw', name: 'S&W Immobilien' }),
    knex('companies').insert({ id: 'laub', name: 'Laub Immobilien' }),
    knex('companies').insert({ id: 'blumenwinkel', name: 'Blumenwinkel' }),
    knex('companies').insert({ id: 'neubaukompass', name: 'Neubaukompass' }),
    knex('companies').insert({ id: 'baar', name: 'Baar Bauunternehmen' })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'besserwohnen').delete(),
    knex('companies').where('id', 'haitz').delete(),    
    knex('companies').where('id', 'suw').delete(),
    knex('companies').where('id', 'laub').delete(),
    knex('companies').where('id', 'blumenwinkel').delete(),
    knex('companies').where('id', 'neubaukompass').delete(),
    knex('companies').where('id', 'baar').delete()
  ]);
};
