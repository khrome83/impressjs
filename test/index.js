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
      
      reporter.should.equal(custom_reporter);
    });
    
  });
  
  describe('#addPlugin()', function() {
    
    beforeEach(function(){
      impress.init(null, null, []); 
    });
    
    it('should add single plugin specified as an argument to manifest', function() {
      impress.addPlugin('use');
      var plugins = impress.__get__('_plugins');
      
      plugins.should.include('use');
      plugins.should.have.length.of(1);
    });
    
    it('should add any plugins specified as arguments to manifest', function() {
      impress.addPlugins('use', 'test');
      var plugins = impress.__get__('_plugins');
      
      plugins.should.include('use');
      plugins.should.include('test');
      plugins.should.have.length.of(2);        
    });
    
    it('should add all plugins within array to manifest', function() {
      impress.addPlugins(['use', 'test', 'list']);
      var plugins = impress.__get__('_plugins');
      
      plugins.should.include('use');
      plugins.should.include('test');
      plugins.should.include('list');
      plugins.should.have.length.of(3);      
    });
         
  });
  
  describe('#compile()', function () {
    
    before(function(){
      impress.init();
    });
    
    it('should return html string', function() {
      var html = '<ul class="fruit" id="fruit"><li class="apple" data-active="true">Apple</li><li class="pear">Pear</li><li class="blueberry">Blueberry</li></ul>';
      var output = impress.compile(html);
      
      output.should.be.a('string');
    });

    it('should replace the text with attribute value using text action', function() {
      var html = '<ul class="fruit" id="fruit"><li class="apple" data-imp-text="Apple"></li><li class="pear" data-imp-text="Pear"></li></ul>'; 
      var output = impress.compile(html);
      
      output.should.be.a('string');
      output.should.equal('<ul class="fruit" id="fruit"><li class="apple" data-imp-text="Apple">Apple</li><li class="pear" data-imp-text="Pear">Pear</li></ul>'); 
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
