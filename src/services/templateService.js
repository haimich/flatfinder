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
  `;
  
  for (let flats of data.flatResponses) {
    
    flats.forEach((flat, index) => {
      if (!flat.exists) {
        if (index === 0) {
          // add single header for multiple flats of same company
          html += `
            <h3>${data.companyNames[flat.companyId]}</h3>
            <ul>
          `;
        }
        
        html += `
          <li><a href="${flat.url}">${flat.title}</a></li>
        `;
        
        if (index === flats.length - 1) {
          html += `
            </ul>
          `;
        }
      }
    });
  }
  
  html += `
      <h3>Services without offers: ${data.emptyEntries}</h3>
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
