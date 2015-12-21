'use strict';

let nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport();

const TO = 'michipit@gmail.com';
const FROM = TO;

module.exports.sendMail = (subject, text) => {
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