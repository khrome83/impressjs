'use strict';

// Require Modules
var chai = require('chai'),
    proxy = require('proxyquire'),
    rewire = require('rewire');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

describe('actions', function () {

  describe('#createManifest()', function () {
    
    var pluginStub, actions, default_actions;
    
    before(function(){
      pluginStub = {'@noCallThru': true};
      actions  = proxy('../lib/actions', {'sample-plugin': pluginStub});
      default_actions = rewire('../lib/actions').__get__('DEFAULT_ACTIONS');
    });

    it('should include all default commands if plugins includes "defaults"', function () {
      var manifest = actions.createManifest(['defaults'], '');
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
      
      var manifest = actions.createManifest(['sample-plugin', 'test', 'list'], 'data-imp-');
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