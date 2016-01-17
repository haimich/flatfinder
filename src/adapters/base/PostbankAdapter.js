'use strict';

let cheerio = require('cheerio');
let Adapter = require('./Adapter');
let Flat = require('../../models/Flat');

let phantomjs = require('phantomjs');
let path = require('path');
let childProcess = require('child_process');

class PostbankAdapter extends Adapter {
  
  constructor(companyId, baseUrl) {
    super(companyId, baseUrl, '.fio-object-info h3 a');
    
    this.urlSuffix = '';
    this.getUrlFromElement = null;
    this.useAbsoluteUrls = false;
  }
  
  scrape() {
    console.log('Scraping', this.companyId);
    
    return this.fetchPageContent()
      .then(response => {
        let flats = [];
        let $ = cheerio.load(response);
        
        $(this.searchString).each((i, el) => {
          let title = $(el).find('span').first().text().trim();
          
          if (title === '' || this.isBlacklisted(title)) {
            return;
          }
          
          let flatUrl = this.extractUrlFromElement($, el, this.getUrlFromElement);
          let url = this.extractUrl(flatUrl, this.baseUrl, this.urlSuffix, this.useAbsoluteUrls);
          
          let flat = new Flat(this.companyId, title, url);
          flats.push(flat);
        });
        
        return flats;
      });
  }
  
  fetchPageContent() {
    return new Promise((resolve, reject) => {
      let binPath = phantomjs.path;
      let childArgs = [
        path.join(__dirname, '../phantomjs/postbank.js')
      ];
      let options = {
        maxBuffer: 1000000 * 1024 // buffer must be high to return content
      };

      childProcess.execFile(binPath, childArgs, options, (err, stdout, stderr) => {
        if (err) {
          console.log('Phantomjs threw error', err, stderr, err.stack);
          reject(err);
        } else {
          resolve(stdout);
        }
      });  
    });
  } 
  
}

module.exports = PostbankAdapter;