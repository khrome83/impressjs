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
      var options = impress.__get__('options');
    
      options.should.be.a('object');
      options.should.eql(defaults);
    });

    it('should contain not contaian a reporter', function () {
      var reporter = impress.__get__('reporter');
    
      should.not.exist(reporter);
    });

    it('should return manifest with default actions', function () {
      var manifest = impress.__get__('manifest');
    
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
      var options = impress.__get__('options');
    
      options.should.be.a('object');
      options.should.have.property('prefix');
      options.prefix.should.equal('data-i-');
    });

    it('should accept argument for reporter', function () {
      var reporter = impress.__get__('reporter');
      
      reporter.should.eql(reporter);
    });

    it('should return manifest with only plugins specified', function () {
      var manifest = impress.__get__('manifest');
    
      manifest.should.be.a('object');
      manifest.attribute.should.be.a('object');
      manifest.attribute.should.have.all.keys(['data-i-test']);
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
