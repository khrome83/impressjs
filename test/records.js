'use strict';

// Require Modules
var chai = require('chai'),
    proxy = require('proxyquire'),
    rewire = require('rewire');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

describe('records', function () {

  describe('#insert()', function () {
    
    var records;
    
    before(function(){
      records = require('../lib/records');
    });
    
    it('should return a object map with all types we check for (element, attribute, class, id)', function() {
      
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