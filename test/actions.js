'use strict';

// Require Modules
var chai = require('chai'),
    proxy = require('proxyquire');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Global Test Vars
var default_actions = ['data-imp-test', 'data-imp-list'];


describe('actions', function () {

  describe('#createManifest()', function () {
    
    var pluginStub, actions;
    
    before(function(){

      pluginStub = {'@noCallThru': true};
      actions  = proxy('../lib/actions', {'sample-plugin': pluginStub});

    });

    it('should include all default commands if plugins includes "defaults"', function () {
      var manifest = actions.createManifest(['defaults'], 'data-imp-');
      manifest.should.be.a('object');
      manifest.should.have.all.keys(default_actions);
    });

    it('should only included specified commands if "defaults" is not specified', function () {
      var manifest = actions.createManifest(['list'], 'data-imp-');
      manifest.should.be.a('object');
      manifest.should.have.all.keys(['data-imp-list']);
    });

    it('should include external plugins if name is specified', function () {
      pluginStub.getProperties = function () { return {'command': 'plugin'}; };
      
      var manifest = actions.createManifest(['list', 'sample-plugin'], 'data-imp-');
      manifest.should.be.a('object');
      manifest.should.have.all.keys(['data-imp-list', 'data-imp-plugin']);
    });

    it('should have external plugins override defaults if using the same command property', function() {
      pluginStub.getProperties = function () { return {'command': 'list'}; };
      
      var manifest = actions.createManifest(['test', 'list', 'sample-plugin'], 'data-imp-');
      manifest.should.be.a('object');
      manifest.should.have.all.keys(['data-imp-list', 'data-imp-test']);
    });

    it('should add all actions to manifest with prefix specified', function () {
      var manifest = actions.createManifest(['test'], 'data-crazy-prefix-');
      manifest.should.be.a('object');
      manifest.should.have.all.keys(['data-crazy-prefix-test']);
    });

  });

});