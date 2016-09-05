'use strict';

let nconf = require('../providers/configuration').getInstance();
let request = require('request-promise');

function sendMail(subject, text) {
  if (nconf.get('NODE_ENV') === 'development') {
    console.log(subject, text);
    return;
  }
  
  return request({
    method: 'POST',
    uri: nconf.get('mailgun_url'),
    'auth': {
      'user': nconf.get('mailgun_user'),
      'pass': nconf.get('mailgun_key')
    },
    form: {
      from: 'Flat Finder <mail@flatfinder.de>',
      to: nconf.get('mailgun_to'),
      subject: subject,
      html: text
    }
  }).then(response => {
    console.log('Response from Mailgun', response);
  }).catch(error => {
    console.log(error, error.stack);
  });
}

module.exports = {
  sendMail
};
