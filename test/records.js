'use strict';

// Require Modules
var chai = require('chai');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

describe('records', function () {

  describe('#insert()', function () {
    
    var records, location;
    
    before(function(){
      records = require('../lib/records');
      
      location = [];
      
      location.push( { line: 6, col: 8, startOffset: 67, endOffset: 100 } );
      location.push( { line: 6, col: 12, startOffset: 68, endOffset: 72 } );
      location.push( { line: 9, col: 8, startOffset: 98, endOffset: 107 } );
      
      // Insert Mock Data
      records.insert('sample1', {bob: 45, alex: 25}, location[0]);
      records.insert('sample2', {harvy: 13, mitch: 76, martial: ['arts', 'kung', 'foo']}, location[1]);
      records.insert('sample3', {jakie: 13}, location[2]);
    });
    
    it('should return a object map with all types we check for (element, attribute, class, id)', function() {
      console.log(records.retrieveScope(location[2], {static: {bob: 1, frank:2 }}));
    });

  });

  describe('#retrieveScope()', function () {
    it('', function() {
         
    });
  });

  describe('#reset()', function () {
    it('', function() {
         
    });
  });


});