'use strict';

let express = require('express');
let app = express();
let mailService = require('./services/mailService');

app.set('port', (process.env.PORT || 3000));

app.get('/scrape', (request, response) => {
  mailService.sendMail('testmail', 'testText' + process.env.NODE_ENV);
  response.send('done');
});

let server = app.listen(app.get('port'), () => {
  let host = server.address().address;
  let port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);
});