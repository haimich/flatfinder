'use strict';

let cool = require('cool-ascii-faces');
let express = require('express');
let app = express();
let pg = require('pg');

let service = require('./scrapeService');

app.set('port', (process.env.PORT || 3000));

app.get('/', (request, response) => {
  res.send(cool());
});

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
  pg.connect(process.env.DATABASE_URL, (err, client, done) => {
    client.query('SELECT * FROM test_table', (err, result) => {
      done();
      if (err) {
        console.error(err);
        response.send('Error ' + err);
      }
      else {
        response.send(result.rows);
      }
    });
  });
})

let server = app.listen(app.get('port'), () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});