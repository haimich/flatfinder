
exports.up = (knex) => {
  return knex.schema.createTable('companies', (table) => {
    table.string('id').primary().index();
    table.text('name');
  }).then(() => {
    return Promise.all([
      knex('companies').insert({ id: 'cuffaro', name: 'Cuffaro' }),
      knex('companies').insert({ id: 'km', name: 'Köhler & Meinzer' }),
      knex('companies').insert({ id: 'weisenburger', name: 'Weisenburger' }),
      knex('companies').insert({ id: 'throm', name: 'Throm' }),
      knex('companies').insert({ id: 'volkswohnung', name: 'Volkswohnung' }),
      knex('companies').insert({ id: 'artekt', name: 'Artekt' }),
      knex('companies').insert({ id: 'goebelbecker', name: 'Göbelbecker-Bau' }),
      knex('companies').insert({ id: 'helblerichter', name: 'Helble & Richter' }),
      knex('companies').insert({ id: 'immoka', name: 'ImmoKA' }),
      knex('companies').insert({ id: 'kassel', name: 'kassel' }),
      knex('companies').insert({ id: 'spaka', name: 'Sparkassen Immocenter' }),
      knex('companies').insert({ id: 'spaka_haeuser', name: 'Sparkassen Immocenter Häuser' }),
      knex('companies').insert({ id: 'weststadtmakler', name: 'Weststadtmakler' }),
      knex('companies').insert({ id: 'immotrend', name: 'Immotrend' }),
      knex('companies').insert({ id: 'gebaka', name: 'Gebaka' }),
      knex('companies').insert({ id: 'gig', name: 'GIG GmbH' }),
      knex('companies').insert({ id: 'besserwohnen', name: 'Besser Wohnen in Karlsruhe' }),
      knex('companies').insert({ id: 'haitz', name: 'Haitz' }),
      knex('companies').insert({ id: 'suw', name: 'S&W Immobilien' }),
      knex('companies').insert({ id: 'laub', name: 'Laub Immobilien' }),
      knex('companies').insert({ id: 'blumenwinkel', name: 'Blumenwinkel' }),
      knex('companies').insert({ id: 'neubaukompass', name: 'Neubaukompass' }),
      knex('companies').insert({ id: 'baar', name: 'Baar Bauunternehmen' }),
      knex('companies').insert({ id: 'ewg', name: 'EWG Eigentums-Wohnbau-GmbH' }),
      knex('companies').insert({ id: 'forum', name: 'Forum Bauträger' }),
      knex('companies').insert({ id: 'wipfler', name: 'Wipfler Immobilien & Bauträger GmbH' }),
      knex('companies').insert({ id: 'sekundus', name: 'Sekundus' }),
      knex('companies').insert({ id: 'speck', name: 'Speck Immobilien' }),
      knex('companies').insert({ id: 'leitgieb', name: 'Leitgieb Immobilien' }),
      knex('companies').insert({ id: 'engelvoelkers', name: 'Engel & Völkers' }),
      knex('companies').insert({ id: 'seegerrusswurm', name: 'Seeger Russwurm' }),
      knex('companies').insert({ id: 'ebaykleinanzeigen', name: 'Ebay Kleinanzeigen' }),
      knex('companies').insert({ id: 'heck', name: 'Martin Heck' }),
      knex('companies').insert({ id: 'immowenk', name: 'Immowenk' }),
      knex('companies').insert({ id: 'aniseustachi', name: 'Anis & Eustachi' }),
      knex('companies').insert({ id: 'postbank', name: 'Postbank' }),
      knex('companies').insert({ id: 'pellrich', name: 'Pell-Rich' }),
      knex('companies').insert({ id: 'avallone', name: 'Avallone' }),
      knex('companies').insert({ id: 'can', name: 'Can Immobilien' }),
      knex('companies').insert({ id: 'kuehn', name: 'Kühn Immobilien' }),
      knex('companies').insert({ id: 'hustherbold', name: 'Hust & Herbold' }),
      knex('companies').insert({ id: 'pferrer', name: 'Pferrer Rheinstetten' }),
      knex('companies').insert({ id: 'koch-rheinstetten', name: 'Immobilien Koch Rheinstetten' }),
    ]);
  });
};

exports.down = (knex, Promise) => {
  return Promise.all([
    knex.schema.dropTable('companies')
  ]);
};