'use strict';

let nconf = require('nconf');

let instance = null;

module.exports.getInstance = () => {
  if (instance === null) {
    nconf.argv({
      'port': {
        describe: 'Port for Express',
        demand: false
      }
    });

    nconf.argv()
      .env();
    
    nconf.defaults({
      'port': 3030,
      'NODE_ENV': 'development',
      'mailgun_url': '',
      'mailgun_user': 'api',
      'mailgun_key': '',
      'mailgun_to_dev': '',
      'mailgun_to_prod': ''
    });
    
    instance = nconf;
  }
  
  return instance; 
}