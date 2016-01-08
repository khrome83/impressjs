'use strict';

// Require Modules
var chai = require('chai');
var rewire = require('rewire');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

describe('parser', function () {

  describe('#setup()', function () {
    
    var parser;
    
    before(function(){
      parser = rewire('../lib/parser');
    });
    
    it('should return a object map with all types we check for (element, attribute, class, id)', function() {
      var manifest = actions.createManifest(['defaults'], '');
      manifest.should.be.a('object');
      manifest.should.have.all.keys(['element', 'attribute', 'class', 'id']);
      manifest.element.should.be.a('object');
      manifest.attribute.should.be.a('object');
      manifest.class.should.be.a('object');
      manifest.id.should.be.a('object');
    });

  });
  
  describe('#parse()', function () {
    
    var pluginStub, actions, default_actions;
    
    before(function(){
      pluginStub = {'@noCallThru': true};
      actions  = proxy('../lib/actions', {'sample-plugin': pluginStub});
      default_actions = rewire('../lib/actions').__get__('DEFAULT_ACTIONS');
    });
    
    it('should return a object map with all types we check for (element, attribute, class, id)', function() {
      var manifest = actions.createManifest(['defaults'], '');
      manifest.should.be.a('object');
      manifest.should.have.all.keys(['element', 'attribute', 'class', 'id']);
      manifest.element.should.be.a('object');
      manifest.attribute.should.be.a('object');
      manifest.class.should.be.a('object');
      manifest.id.should.be.a('object');
    });

  });  

});