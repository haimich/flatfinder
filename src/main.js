'use strict';

let express = require('express');
let app = express();

let service = require('./services/scrapeService');
let dbHelper = require('./helpers/db');

app.set('port', (process.env.PORT || 3000));

app.get('/scrape', (request, response) => {
  service.scrapeAll()
    .then((flats) => {
      console.log('Got response', flats)
      response.send(flats);
    })
    .catch((err) => {
      console.error(err);
      response.send('Error ' + err);
    });
});

app.get('/db', (request, response) => {
  response.send(service.hasTable());
});

let server = app.listen(app.get('port'), () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});