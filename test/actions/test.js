'use strict';

// Require Modules
var chai = require('chai'),
    test = require('../../lib/actions/test');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Action Test Tests
describe('actions/test', function () {

  describe('constructor()', function () {

    var action = test({}); 
    
    it('should return processed DOM tree', function () {
      action.should.be.a('object');
    });

  });

  describe('#getProperties()', function () {

    var props = test.getProperties();

    it('should return props object', function () {
      props.should.be.a('object');
    });

    it('props required to contain "command" property', function () {
      props.should.include.keys(['command']);
      props.command.should.be.a('string');
    });
    
    it('props required to contain "bundle" property of "default"', function () {
      props.should.include.keys(['bundle']);
      props.bundle.should.be.a('string');
      props.bundle.should.equal('default');
    });
    
  });
});
