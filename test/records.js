'use strict';

// Require Modules
var chai = require('chai');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

describe('records', function () {
  var records, location;

  before(function() {
    records = require('../lib/records');
        
    location = [];
        
    location.push( { line: 6, col: 8, startOffset: 67, endOffset: 100 } );
    location.push( { line: 6, col: 12, startOffset: 68, endOffset: 72 } );
    location.push( { line: 9, col: 8, startOffset: 98, endOffset: 107 } );
  });

  describe('#insert()', function () {
    
    before(function() {
      records.insert('sample1', {bob: 45, alex: 25}, location[0]);
    });
    
    it('should insert a new record for access', function() {
      var expected = [ { scope: [ 67, 100 ], key: 'sample1',  data: { bob: 45, alex: 25 } } ],
          r = records.records;
      
      r.should.have.length(1);
      r.should.eql(expected);
    });

  });

  describe('#retrieveScope()', function () {
   
    var expected = { sample1: { bob: 45, alex: 25 }, sample3: { jakie: 13 } };
   
    before(function() {
      records.insert('sample2', {harvy: 13, mitch: 76, martial: ['judo', 'kung foo', 'boxing']}, location[1]);
      records.insert('sample3', {jakie: 13}, location[2]);        
    });
   
    it('should return any item that is within scope', function() {
      var results = records.retrieveScope(location[2]);
      
      results.should.eql(expected);
    });
    
    it('first request should insert entry into cache map', function() {
      var cache = records.cache[location[2].startOffset];
      
      cache.should.contain.all.keys(expected);
      cache.should.be.an('object');
    });
    
    it('multiple requests for the same scope should return from cache', function() {
      records.records = [];
      
      var results = records.retrieveScope(location[2]);
      
      results.should.eql(expected);
      records.records.should.eql([]);
    });
    
  });

});