'use strict';

// Require Modules
var chai = require('chai'),
  should = chai.should(),
  Impress = require('../lib/index'),
  utility = require('../lib/utility');

// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Impress.js Tests
describe('impress', function() {
  describe('#compile()', function () {

    it('tests for value and dispays contents', function () {
      var html = '<p></p>',
        options = { document: '<a></a>' },
        reporter = null;
  
      var impress = Impress(options, reporter);
      impress.compile(html).should.equal('<html></html>');
    });
    
    it('should hide block of content is data-imp-test is false', function() {
      
    });

    it('should show block of content is data-imp-test is true', function() {
      
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
    
    it('should alwasy return {} if both args are not valid objects', function() {
      utility.merge(null, "bob").should.deep.equal({});
    });
    
    it('should alwasy return back obj1 if obj2 is not a valid type {}', function() {
      var obj = {
            foo: 'foo',
            bar: 'bar'
          };
     
      utility.merge(obj, 'foo').should.deep.equal(obj);
      utility.merge(obj, [1, 2, 3]).should.deep.equal(obj);
      utility.merge(obj, undefined).should.deep.equal(obj);
      utility.merge(obj, null).should.deep.equal(obj);
      utility.merge(obj, function (e) {return true;}).should.deep.equal(obj);
    });
    
    it('should alwasy return back obj2 if obj1 is not a valid type {}', function() {
      var obj = {
            foo: 'foo',
            bar: 'bar'
          };
      
      utility.merge('foo', obj).should.deep.equal(obj);
      utility.merge([1, 2, 3], obj).should.deep.equal(obj);
      utility.merge(undefined, obj).should.deep.equal(obj);
      utility.merge(null, obj).should.deep.equal(obj);
      utility.merge(function (e) {return true;}, obj).should.deep.equal(obj);
    });
    
  });
});