'use strict';

// Require Modules
var chai = require('chai');
var should = chai.should();
var rewire = require('rewire');
var _ = require('lodash');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Impress.js Tests
describe('impress', function () {

  var impress;

  before(function() {
    impress = rewire('../lib/index');
  });

  describe('no initialization (defaults)', function () {
    
    var default_actions = [], defaults;
    
    before(function() {
      defaults = impress.__get__('DEFAULT_OPTIONS');
    
      var prefix = defaults.prefix,
          actions = rewire('../lib/actions').__get__('DEFAULT_ACTIONS');
    
      default_actions = _.map(actions, function(action) {
        return prefix + action;
      });
    
    });

    it('should return default options', function () {
      var options = impress.__get__('_options');
    
      options.should.be.a('object');
      options.should.eql(defaults);
    });

    it('should contain not contaian a reporter', function () {
      var reporter = impress.__get__('_reporter');
    
      should.not.exist(reporter);
    });

    it('should return manifest with default actions', function () {
      var manifest = impress.__get__('_manifest');
    
      manifest.should.be.a('object');
      manifest.should.have.property('attribute');
      manifest.attribute.should.be.a('object');
      manifest.attribute.should.contain.all.keys(default_actions);
    });

  });

  describe('#init()', function () {
    var Reporter;

    before(function(){
      Reporter = function Reporter() {};
        
      var options = {
            prefix: 'data-i-'
          },
          plugins = ['test'];
      
      impress.init(options, Reporter, plugins);
    });

    it('should override default options with any new options passed', function () {      
      var options = impress.__get__('_options');
    
      options.should.be.a('object');
      options.should.have.property('prefix');
      options.prefix.should.equal('data-i-');
    });

    it('should accept argument for reporter', function () {
      var reporter = impress.__get__('_reporter');
      
      reporter.should.eql(reporter);
    });

    it('should return manifest with only plugins specified', function () {
      var manifest = impress.__get__('_manifest');
    
      manifest.should.be.a('object');
      manifest.attribute.should.be.a('object');
      manifest.attribute.should.have.all.keys(['data-i-test']);
    });

  });

  describe('#setPrefix()', function() {
    
    before(function() {
      impress.setPrefix('data-sample-'); 
    });
    
    it('should set the prefix inside options', function() {
      var prefix = impress.__get__('_options').prefix;
      
      prefix.should.equal('data-sample-');
    });
   
    it('should update manifest to use new prefix', function() {
      var manifest = impress.__get__('_manifest');
      
      manifest.should.be.a('object');
      manifest.attribute.should.be.a('object');
      manifest.attribute.should.have.all.keys(['data-sample-test']);
    }); 
    
  });
  
  describe('#setDirectory()', function() {
    
    before(function() {
      impress.setDirectory('../data/'); 
    });
    
    it('should set the directory inside options', function() {
      var dir = impress.__get__('_options').dir;
      
      dir.should.equal('../data/');
    });
    
  });
  
  describe('#reporter()', function() {
    
    var custom_reporter = function rep() {};
    
    it('should set the reporter when argument is passed into method', function() {
      impress.reporter(custom_reporter);
      var reporter = impress.__get__('_reporter');
      
      reporter.should.equal(custom_reporter);
    });  
    
    it('should return last set reporter when no arguments are passed into method', function() {
      var reporter = impress.reporter();
      
      console.log(reporter);
      
      reporter.should.equal(custom_reporter);
    });
    
  });
  
  describe('#compile()', function () {
    var html;
    
    before(function(){
      html = '<ul class="fruit" id="fruit"><li class="apple" data-active="true">Apple</li><li class="pear">Pear</li><li class="blueberry">Blueberry</li></ul>';
      impress.init();
    });
    
    it('should return html string', function() {
      var output = impress.compile(html);
      
      output.should.be.a('string');
    });

/*
    it('should do nothing if data-imp-test is true', function () {  
      var output = impress.compile(html);

      
    });

    it('should remove block of content is data-imp-test is false', function () {

    });
    */

  });
});
