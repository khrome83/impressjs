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
    
    describe('with no arguments passed in', function() {
      var impress = new Impress();
      
      it('should return a instance of type Impress()', function() {
          impress.should.be.an.instanceof(Impress);
      });
      
      it('should return default options', function() {
          impress.should.have.property('options');
      });
      
      it('should contain not contaian a reporter', function() {
          impress.should.have.property('reporter');
          should.not.exist(impress.reporter);
      });        
    
      it('should return manifest with default actions', function() {
          impress.should.have.property('manifest');
          impress.manifest.should.contain.all.keys(['data-imp-test', 'data-imp-list']);
      });
    
    });

    describe('with arguments passed in', function() {
  
      it('should override default options with any new options passed', function() {
          var imp3 = new Impress();
          imp3.should.have.deep.property('options');     
      });
      
      it('should accept argument for reporter', function() {
          var imp4 = new Impress();
          imp4.should.have.deep.property('options');     
      });
        
    });

    
  });
  
  describe('#compile()', function () {

    it('should do nothing if data-imp-test is true', function() {
      
    });

    it('should remove block of content is data-imp-test is false', function() {
      
    });

  });  
});