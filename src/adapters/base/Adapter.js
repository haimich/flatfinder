'use strict';

class Adapter {
  
  constructor() {
    this.titleBlacklist = [ 'verkauft', 'keine Angebote', '' ];
  }
    
  extractUrl(text, baseUrl, urlSuffix, useAbsoluteUrls) {
    let url = '';
    
    if (text !== undefined && text !== '') {
      if (useAbsoluteUrls) {
        url = text;
      } else {
        url = baseUrl + text;
      }
    } else {
      url = baseUrl + urlSuffix;
    }
    
    return url;
  }
  
  isBlacklisted(blacklist, text) {
    for (let entry of blacklist) {
      if (text.toLowerCase().indexOf(entry.toLowerCase()) >= 0) {
        return true;
      }
    }
    return false;
  }
}

module.exports = Adapter;