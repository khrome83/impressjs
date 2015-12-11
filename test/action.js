'use strict';

// Require Modules
var chai = require('chai'),
    actions = require('../lib/actions');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Global Test Vars
var default_actions = ['data-imp-test', 'data-imp-list'];


describe('actions', function () {

  describe('#createManifest()', function () {

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
      //var manifest = actions.createManifest(['list', 'chai'], 'data-imp-');
      //manifest.should.be.a('object');
      //manifest.should.have.all.keys(['data-imp-list', 'data-imp-chai']);
    });

    it('should add all actions to manifest with prefix specified', function () {
      var manifest = actions.createManifest(['test'], 'data-crazy-prefix-');
      manifest.should.be.a('object');
      manifest.should.have.all.keys(['data-crazy-prefix-test']);
    });

  });

});