'use strict';

// Require Modules
var chai = require('chai'),
    should = chai.should(),
    rewire = require('rewire'),
    _ = require('lodash');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Impress.js Tests
describe('impress', function () {

  var Impress, impress;

  before(function() {
    Impress = require('../lib/index');
  });

  describe('new Impress()', function () {

    describe('with no arguments passed in', function () {
      
      var default_actions = [];
      
      before(function() {
        var prefix = rewire('../lib/index').__get__('DEFAULT_OPTIONS').prefix,
            actions = rewire('../lib/actions').__get__('DEFAULT_ACTIONS');
        
        default_actions = _.map(actions, function(action) {
          return prefix + action;
        });
        
        impress = new Impress();
      });

      it('should return a instance of type Impress()', function () {
        impress.should.be.an.instanceof(Impress);
      });

      it('should return default options', function () {
        impress.should.have.property('options');
      });

      it('should contain not contaian a reporter', function () {
        impress.should.have.property('reporter');
        should.not.exist(impress.reporter);
      });

      it('should return manifest with default actions', function () {
        impress.should.have.property('manifest');
        impress.manifest.should.contain.all.keys(default_actions);
      });

    });

    describe('with arguments passed in', function () {

      before(function(){
        var options = {
              prefix: 'data-i-'
            },
            reporter = function Reporter() { },
            plugins = ['test'];

        impress = new Impress(options, reporter, plugins);
      });

      it('should override default options with any new options passed', function () {
        impress.should.have.property('options');
        impress.options.should.have.property('prefix');
        impress.options.prefix.should.equal('data-i-');
      });

      it('should accept argument for reporter', function () {
        impress.should.have.deep.property('reporter');
        should.exist(impress.reporter);
      });

      it('should return manifest with only plugins specified', function () {
        impress.should.have.property('manifest');
        impress.manifest.should.have.all.keys(['data-i-test']);
      });

    });

  });

  describe('#compile()', function () {

    it('should do nothing if data-imp-test is true', function () {

    });

    it('should remove block of content is data-imp-test is false', function () {

    });

  });
});
