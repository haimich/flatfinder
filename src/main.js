'use strict';

let express = require('express');
let app = express();

let service = require('./services/scrapeService');
let nconf = require('./providers/configuration').getInstance();

app.set('port', nconf.get('port'));

app.get('/scrape', (request, response) => {
  service.scrapeAll()
    .then((flats) => {
      response.send(flats);
    })
    .catch((err) => {
      console.error(err, err.stack);
      response.send('Error ' + err);
    });
});

let server = app.listen(app.get('port'), () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});