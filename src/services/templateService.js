'use strict';

let fs = require('fs');
let path = require('path');

const TEMPLATE_NAMES = {
  OFFERS: 'offers'
};
let templates = {
  'offers': compileOffersTemplate,
};

function compileTemplate(templateName, data) {
  return templates[templateName](data);
}

/**
 * Offers Template
 * @param data.flatResponses: array of flat arrays
 * @param data.companyNames: string array of company names
 * @param data.emptyEntries: number of companies that did not return any offers
 */
function compileOffersTemplate(data) {
  let html = `
  <!doctype html>
  <html lang=en-us>
    <head><meta charset=utf-8><title>Flatfinder</title></head>
    <body>
      <h2>Flatfinder 5000</h2>
      <img src="https://raw.githubusercontent.com/haimich/flatfinder/master/logo.png">
  `;
  
  for (let flats of data.flatResponses) {
    
    let flatsHtml = '';
    
    for (let flat of flats) {
      if (flat.exists) {
        continue;
      }
      
      flatsHtml += `<li><a href="${flat.url}">${flat.title}</a></li>\n`;
    }
    
    if (flatsHtml !== '') {
      html += `
        <h3>${data.companyNames[flats[0].companyId]}</h3>
        <ul>${flatsHtml}</ul>
      `;
    }
  }
  
  html += `
      <h4>Services without offers: ${data.emptyEntries}</h4>
    </body>
  </html>
  `;
  
  return html;
}


function readFile(fileName) {
  return fs.readFileSync(path.join(__dirname, fileName));
}

module.exports = {
  compileTemplate, TEMPLATE_NAMES
}
