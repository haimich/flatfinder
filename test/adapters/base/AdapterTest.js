'use strict';

let should = require('chai').should();
let Adapter = require('../../../src/adapters/base/Adapter')

describe('isBlacklisted', () => {
  let adapter;
  
  beforeEach(() => {
    adapter = new Adapter();      
  });
  
  describe('when matching', () => {
    
    it('should return false', () => {
      let blacklist = ['sold'];
      adapter.blacklist = blacklist;
      
      adapter.isBlacklisted('bla foo sold bla').should.be.true;
    });
    
    it('should return false with multiple items', () => {
      let blacklist = ['sold', 'priceless'];
      adapter.blacklist = blacklist;
      
      adapter.isBlacklisted('bla foo sol priceless bla').should.be.true;
    });
    
    it('should ignore case', () => {
      let blacklist = ['soLD', 'PRICEless'];
      adapter.blacklist = blacklist;
      
      adapter.isBlacklisted('bla foo sold priceless bla').should.be.true;
    });
    
  });
  
  describe('when not matching', () => {
    
    it('should return false', () => {
      let blacklist = ['sold'];
      adapter.blacklist = blacklist;
      
      adapter.isBlacklisted('bla foo').should.be.false;
    });
    
    it('should return false for an empty array', () => {
      let blacklist = [];
      adapter.blacklist = blacklist;
      
      adapter.isBlacklisted('bla sold foo').should.be.false;
    });
    
  });
});

describe('extractUrl', () => {
    
  it('should extract the url correctly', () => {
    let text = '/expose/123.html';
    let baseUrl = 'https://www.google.de';
    let urlSuffix = '/abc?page=1';
    let useAbsoluteUrls = false;
    
    new Adapter().extractUrl(text, baseUrl, urlSuffix, useAbsoluteUrls).should.equal('https://www.google.de/expose/123.html');
  });
  
  it('should work when no urlSuffix is given', () => {
    let text = '/expose/123.html';
    let baseUrl = 'https://www.google.de';
    let urlSuffix = '';
    let useAbsoluteUrls = false;
    
    new Adapter().extractUrl(text, baseUrl, urlSuffix, useAbsoluteUrls).should.equal('https://www.google.de/expose/123.html');
  });
  
  it('should work for absolute urls', () => {
    let text = 'https://www.yahoo.de/expose/123.html';
    let baseUrl = 'https://www.google.de';
    let urlSuffix = '';
    let useAbsoluteUrls = true;
    
    new Adapter().extractUrl(text, baseUrl, urlSuffix, useAbsoluteUrls).should.equal('https://www.yahoo.de/expose/123.html');
  });
  
  it('should work when no url is given', () => {
    let text = '';
    let baseUrl = 'https://www.google.de';
    let urlSuffix = '/abc?page=1';
    let useAbsoluteUrls = false;
    
    new Adapter().extractUrl(text, baseUrl, urlSuffix, useAbsoluteUrls).should.equal('https://www.google.de/abc?page=1');
  });
    
});

describe('preparePageUrl', () => {
    
  it('should place the page at the right position', () => {
    let baseUrl = 'http://www.cuffaro-immobilien.de/immobilien/page/INSERTPAGE/?post_type=immomakler';
    
    new Adapter('cuffaro', baseUrl).preparePageUrl(15, baseUrl).should.equal('http://www.cuffaro-immobilien.de/immobilien/page/15/?post_type=immomakler');
  });
      
  it('should place the page at the end', () => {
    let baseUrl = 'http://www.cuffaro-immobilien.de/immobilien/page/?p=INSERTPAGE';
    
    new Adapter('cuffaro', baseUrl).preparePageUrl(0, baseUrl).should.equal('http://www.cuffaro-immobilien.de/immobilien/page/?p=0');
  });
  
});