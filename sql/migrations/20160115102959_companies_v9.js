
exports.up = (knex, Promise) => {
  return Promise.all([
    knex('companies').insert({ id: 'leitgieb', name: 'Leitgieb Immobilien' }),
    knex('companies').insert({ id: 'engelvoelkers', name: 'Engel & Völkers' }),
    knex('companies').insert({ id: 'seegerrusswurm', name: 'Seeger Russwurm' }),
    knex('companies').insert({ id: 'ebaykleinanzeigen', name: 'Ebay Kleinanzeigen' }),
    knex('companies').insert({ id: 'heck', name: 'Martin Heck' }),
    knex('companies').insert({ id: 'immowenk', name: 'Immowenk' }),
    knex('companies').insert({ id: 'aniseustachi', name: 'Anis & Eustachi' }),
  ]);
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex('companies').where('id', 'leitgieb').delete(),
    knex('companies').where('id', 'engelvoelkers').delete(),
    knex('companies').where('id', 'seegerrusswurm').delete(),
    knex('companies').where('id', 'ebaykleinanzeigen').delete(),
    knex('companies').where('id', 'heck').delete(),
    knex('companies').where('id', 'immowenk').delete(),
    knex('companies').where('id', 'aniseustachi').delete(),
  ]);
};
