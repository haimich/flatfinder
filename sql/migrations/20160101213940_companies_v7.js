
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'besserwohnen', name: 'Besser Wohnen in Karlsruhe' }),
    knex('companies').insert({ id: 'haitz', name: 'Haitz' }),
    knex('companies').insert({ id: 'suw', name: 'S&W Immobilien' })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'besserwohnen').delete(),
    knex('companies').where('id', 'haitz').delete(),    
    knex('companies').where('id', 'suw').delete()    
  ]);
};
