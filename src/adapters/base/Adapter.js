'use strict';

class Adapter {
  
  /**
   * @param string companyId:        unique id from database
   * @param string baseUrl:          the url of the service
   * @param string searchString:     a jQuery style search string to extract the flat titles
   */
  constructor(companyId, baseUrl, searchString) {
    this.companyId = companyId;
    this.baseUrl = baseUrl;
    this.searchString = searchString;
    
    this.titleBlacklist = [ 'verkauft', 'keine Angebote', 'Marktwertgutachten',
                            'vermietet', 'kapitalanleger', 'kapitalanlage', 'rendite' ];
    
    this.typeBlacklist = [ 'Praxisetage', 'Büro', 'Laden', 'Läden',
                           'Werkstatt', 'Lager', 'Verkaufsfläche',
                           'Industriehalle', 'Anwesen', 'Gaststätte', 
                           'Restaurant', 'Halle' ];
  }
   
  preparePageUrl(page, baseUrl, urlSuffix) {
    let url = baseUrl
    if (urlSuffix !== undefined && urlSuffix !== '') {
      url += urlSuffix;
    }
    return url.replace('INSERTPAGE', page)
  }
  
  extractUrlFromElement($, el, getUrlFromElement) {
    let flatUrl = '';
    
    if (getUrlFromElement) {
      // url lies in another dom element
      flatUrl = getUrlFromElement($(el));
    } else {
      // url lies on same element as the title
      flatUrl = $(el).attr('href');
    }
    
    return flatUrl;
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