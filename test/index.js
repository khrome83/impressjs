var chai = require('chai'),
  should = chai.should(),
  impress = require('../lib/index'),
  compile = impress.compile,
  Utility = require('../lib/utility');

chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

describe('Impress', function() {
  describe('#compile()', function () {
    it ('tests for value and dispays contents', function () {
      var html = "<p></p>",
        options = {},
        reporter = null;
  
      compile(html, options, reporter).should.equal('<html></html>');
    });
  });  
});

describe('Utility', function() {
  describe('#merge()', function() {
    it('should join two objects together', function () {
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
          
      JSON.stringify(Utility.merge(obj1, obj2)).should.equal(JSON.stringify(result));
    });
  });
});