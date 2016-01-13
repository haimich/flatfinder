'use strict';

let nconf = require('../helpers/configuration').getInstance();
let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport();

const MICHIPIT = 'michipit@gmail.com';
const CRISTI = 'im.cristina.lica@gmail.com';

const TO = getReceivers();
const FROM = MICHIPIT;

function getReceivers() {
  if (nconf.get('NODE_ENV') === 'development') {
    return MICHIPIT;
  } else {
    return MICHIPIT + ' ' + CRISTI;
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