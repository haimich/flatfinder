'use strict';

class Adapter {
  
  constructor() {
    this.titleBlacklist = [ 'verkauft', 'keine Angebote' ];
  }
  
  isBlacklisted(blacklist, text) {
    for (let entry of blacklist) {
      if (text.indexOf(entry) >= 0) {
        return true;
      }
    }
    return false;
  }
}

module.exports = Adapter;