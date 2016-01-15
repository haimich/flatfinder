'use strict';

let should = require('chai').should();
let Adapter = require('../../../src/adapters/base/Adapter')

describe('isBlacklisted', () => {
  describe('when matching', () => {
    
    it('should return false', () => {
      let blacklist = ['sold'];
      
      new Adapter().isBlacklisted(blacklist, 'bla foo sold bla').should.be.true;
    });
    
    it('should return false with multiple items', () => {
      let blacklist = ['sold', 'priceless'];
      
      new Adapter().isBlacklisted(blacklist, 'bla foo sol priceless bla').should.be.true;
    });
    
  });
  
  describe('when not matching', () => {
    
    it('should return false', () => {
      let blacklist = ['sold'];
      
      new Adapter().isBlacklisted(blacklist, 'bla foo').should.be.false;
    });
    
    it('should return false for an empty array', () => {
      let blacklist = [];
      
      new Adapter().isBlacklisted(blacklist, 'bla sold foo').should.be.false;
    });
    
  });
});