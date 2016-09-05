'use strict';

let express = require('express');
let app = express();

let service = require('./services/scrapeService');
let nconf = require('./providers/configuration').getInstance();

app.set('port', nconf.get('port'));

app.get('/scrape', (request, response) => {
  response.status(202).send('All rity');

  service.scrapeAll()
    .then((flats) => {
      console.log(flats);
    })
    .catch((err) => {
      console.error(err, err.stack);
    });
});

let server = app.listen(app.get('port'), () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});