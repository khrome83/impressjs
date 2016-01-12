'use strict';

// Require Modules
var chai = require('chai');
var rewire = require('rewire');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

describe('parser', function () {

  describe('#setup()', function () {
    
    var parser, parsers;
    
    before(function(){
      parser = rewire('../lib/parser');
      
      // Mocked Manifest, do not need to mock more than type and action keys
      var manifest = {
        element: {'h1': 'header 1'},
        id: {'id1': 'id 1', 'id2': 'id 2'},
        class: {'className1': 'Class Name 1'},
        attribute: {'data-imp-test': 'sample test', 'data-imp-list': 'sample list'}
      };
      
      parser.setup(manifest);
      
      parsers = parser.__get__('_parsers');
    });
    
    it('should enable element parser', function() {
      parsers.should.have.any.key('element');
    });
    
    it('should enable id parser', function() {
      parsers.should.have.any.key('id');
    });
    
    it('should enable class parser', function() {
      parsers.should.have.any.key('class');
    });
    
    it('should enable attribute parser', function() {
      parsers.should.have.any.key('attribute');
    });
    
    it('should have all enabled parsers', function() {
      parsers.should.have.all.keys(['attribute', 'class', 'id', 'element']); 
    });
    
    it('should include only the element parser', function() {
      var manifest = {
        element: {'h1': 'header 1'}
      };
      
      parser.setup(manifest);
      parsers = parser.__get__('_parsers');
      
      parsers.should.have.all.keys('element');
    });

    it('should include only the class parser', function() {
      var manifest = {
        class: {'className1': 'Class Name 1'}
      };
      
      parser.setup(manifest);
      parsers = parser.__get__('_parsers');
      
      parsers.should.have.all.keys('class');
    });
     
    it('should include only the id parser', function() {
      var manifest = {
        id: {'id1': 'id 1', 'id2': 'id 2'}
      };
      
      parser.setup(manifest);
      parsers = parser.__get__('_parsers');
      
      parsers.should.have.all.keys('id');
    });
          
    it('should include only the attribute parser', function() {
      var manifest = {
        attribute: {'data-imp-test': 'sample test', 'data-imp-list': 'sample list'}
      };
      
      parser.setup(manifest);
      parsers = parser.__get__('_parsers');
      
      parsers.should.have.all.keys('attribute');
    });

  });
  
  describe('#parse()', function () {
    
    //var parser;
    
    before(function(){
      //parser = rewire('../lib/parser');
    });
    
    it('should parse a tree of ATS nodes and return modified tree', function() {

    });

  });  

});