'use strict';

let nconf = require('../providers/configuration').getInstance();
let request = require('request-promise');

function getReceivers() {
  let receivers = '';
  
  if (nconf.get('NODE_ENV') === 'development') {
    receivers = nconf.get('mailgun_to_dev');
  } else {
    receivers = nconf.get('mailgun_to_prod');
  }
  
  return receivers;
}

function sendMail(subject, text) {
  return request({
    method: 'POST',
    uri: nconf.get('mailgun_url'),
    'auth': {
      'user': nconf.get('mailgun_user'),
      'pass': nconf.get('mailgun_key')
    },
    form: {
      from: `Flat Finder <mail@flatfinder.de>`,
      to: getReceivers(),
      subject: subject,
      html: text
    }
  }).then(response => {
    console.log(response);
  }).catch(error => {
    console.log(error, error.stack);
  });
}

module.exports = {
  sendMail
};
