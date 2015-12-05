'use strict';

// Require Modules
var chai = require('chai'),
  should = chai.should(),
  Impress = require('../lib/index');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Impress.js Tests
describe('impress', function() {
  
  describe('construction of class', function() {
    
    it('should construct a instance of Impress with default options if no options are passed in', function() {
        var impress = new Impress();
        impress.should.have.deep.property('options');
    });  
    
  });
  
  describe('#compile()', function () {

    it('should hide block of content is data-imp-test is false', function() {
      
    });

    it('should do nothing if data-imp-test is true', function() {
      
    });

  });  
});