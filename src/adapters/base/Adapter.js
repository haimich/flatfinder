'use strict';

class Adapter {
  
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