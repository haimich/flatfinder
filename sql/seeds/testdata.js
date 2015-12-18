
exports.seed = function(knex, Promise) {
  return Promise.join(
    // Deletes ALL existing entries
    knex('offers').del(),

    // Inserts seed entries
    knex('offers').insert({ 'company_id': 'km', 'title': '2-Zimmer-Eigentumswohnung Karlsruhe-Beiertheim', 'url': 'http://throm.de/angebote-verkauf.php' }),
    knex('offers').insert({ 'company_id': 'weisenburger', 'title': 'Rastatt, Wohnpark am Leopoldplatz', 'url': 'http://www.weisenburger.de/kaufen-musterhaeuser-aktuelle-wohnobjekte/wohnungen-reihenhaeuser-doppelhaeuser-einfamilienhaeuser/rastatt-wohnpark-am-leopoldplatz.html' })
  );
};
