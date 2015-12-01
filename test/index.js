'use strict';

// Require Modules
var chai = require('chai'),
  should = chai.should(),
  impress = require('../lib/index'),
  compile = impress.compile,
  utility = require('../lib/utility');

// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Impress.js Tests
describe('impress', function() {
  describe('#compile()', function () {

    it('tests for value and dispays contents', function () {
      var html = "<p></p>",
        options = {},
        reporter = null;
  
      compile(html, options, reporter).should.equal('<html></html>');
    });

  });  
});

// Utility Function Tests
describe('utility', function() {
  describe('#merge(obj1, obj2)', function() {
    
    it('should join two objects together merging keys from obj2 into obj1', function () {
      var obj1 = {
            foo: 'foo',
            bar: 'bar'
          },
          obj2 = {
            baz: 'baz',
            qux: 'qux'
          },
          result = {
            foo: 'foo',
            bar: 'bar',
            baz: 'baz',
            qux: 'qux'
          };

      utility.merge(obj1, obj2).should.deep.equal(result);
    });
    
    it('should add new keys in obj2 as additional keys to obj1', function() {
      var obj1 = {
            foo: 'foo',
            bar: 'bar'
          },
          obj2 = {
            baz: 'baz'
          };
      
      utility.merge(obj1, obj2).should.have.all.keys('foo', 'bar', 'baz');
    });
    
    it('should override any existing keys in obj1 with new value in obj2', function() {
      var obj1 = {
            foo: 'foo',
            bar: 'bar'
          },
          obj2 = {
            foo: 'baz'
          };
          
      utility.merge(obj1, obj2).foo.should.equal('baz');
    });
    
  });
});