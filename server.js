var cool = require('cool-ascii-faces');
var express = require('express');
var app = express();
var pg = require('pg');

app.set('port', (process.env.PORT || 3000));

app.get('/', function (req, res) {
  res.send(cool());
});

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err) {
        console.error(err);
        response.send('Error ' + err);
      }
      else {
        response.send(result);
      }
    });
  });
})

var server = app.listen(app.get('port'), function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});