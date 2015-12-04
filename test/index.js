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
  describe('#compile()', function () {

    it('tests for value and dispays contents', function () {
      var html = '<p></p>',
        options = { document: '<a></a>' },
        reporter = null;
  
      var impress = Impress(options, reporter);
      
      console.log(impress);
      
      impress.compile(html).should.equal('<html></html>');
    });
    
    it('should hide block of content is data-imp-test is false', function() {
      
    });

    it('should do nothing if data-imp-test is true', function() {
      
    });

  });  
});