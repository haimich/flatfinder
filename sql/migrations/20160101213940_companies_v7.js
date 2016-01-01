
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'besserwohnen', name: 'Besser Wohnen in Karlsruhe' })
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'besserwohnen').delete()
  ]);
};
