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
  
  describe('new Impress()', function() {
    
    it('should return a instance of type Impress()', function() {
        var imp1 = new Impress();
        imp1.should.be.an.instanceof(Impress);
    });
    
    it('should return default options if no options are passed in', function() {
        var imp2 = new Impress();
        imp2.should.have.deep.property('options');
    });
    
    it('should override default options with any new options passed', function() {
         var imp3 = new Impress();
        imp3.should.have.deep.property('options');     
    });
    
    it('should accept argument for reporter', function() {
         var imp4 = new Impress();
        imp4.should.have.deep.property('options');     
    });
    
  });
  
  describe('#compile()', function () {

    it('should hide block of content is data-imp-test is false', function() {
      
    });

    it('should do nothing if data-imp-test is true', function() {
      
    });

  });  
});