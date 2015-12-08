'use strict';

// Require Modules
var chai = require('chai'),
  should = chai.should(),
  Impress = require('../lib/index'),
  actions = require('../lib/actions');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Global Test Vars
var default_actions = ['data-imp-test', 'data-imp-list'];

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
          impress.manifest.should.contain.all.keys(default_actions);
      });
    
    });

    describe('with arguments passed in', function() {
      var options = {
          prefix: 'data-i-'
        },
        reporter = function Reporter() {},
        plugins = ['test'];
      
      var impress = new Impress(options, reporter, plugins);
  
      it('should override default options with any new options passed', function() {
          impress.should.have.property('options');  
          impress.options.should.have.property('prefix');
          impress.options.prefix.should.equal('data-i-');   
      });
      
      it('should accept argument for reporter', function() {
          impress.should.have.deep.property('reporter');
          should.exist(impress.reporter);     
      });
      
      it('should return manifest with only plugins specified', function() {
          impress.should.have.property('manifest');
          impress.manifest.should.have.all.keys(['data-i-test']);
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

describe('actions', function() {
  
  describe('#createManifest()', function() {
    
    it('should include all default commands if plugins includes "defaults"', function() {
      var manifest = actions.createManifest(['defaults'], 'data-imp-');
      manifest.should.have.all.keys(default_actions);
    });
    
    it('should only included specified commands if "defaults" is not specified', function() {
      var manifest = actions.createManifest(['list'], 'data-imp-');
      manifest.should.have.all.keys(['data-imp-list']);      
    });
    
    it('should include external plugins if name is specified', function() {
      
    });
    
    it('should add all actions to manifest with prefix specified', function() {
      var manifest = actions.createManifest(['test'], 'data-crazy-prefix-');
      manifest.should.have.all.keys(['data-crazy-prefix-test']);  
    });
  
  });
  
});