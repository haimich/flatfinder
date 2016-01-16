'use strict';

let nconf = require('../helpers/configuration').getInstance();
let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport();

const MICHIPIT = 'michi-mueller@web.de';
const CRISTI = 'mail@cristinalica.de';

const TO = getReceivers();
const FROM = MICHIPIT;

function getReceivers() {
  if (nconf.get('NODE_ENV') === 'development') {
    return MICHIPIT;
  } else {
    return [MICHIPIT, CRISTI].join(', ');;
  }
}

function sendMail (subject, text) {
  let mail = {
    to: TO,
    from: FROM,
    subject: subject,
    html: text,
  }
  transporter.sendMail(mail, (error, info) => {
    if (error) {
      console.error(error);
    }
  });
}

module.exports = {
  sendMail
}
