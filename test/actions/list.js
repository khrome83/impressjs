'use strict';

// Require Modules
var chai = require('chai'),
    list = require('../../lib/actions/list');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Action List Tests
describe('actions/.list', function () {

  describe('constructor()', function () {

    var action = list({}); 
    
    it('should return processed DOM tree', function () {
      action.should.be.a('object');
    });

  });

  describe('#getProperties()', function () {

    var props = list.getProperties();

    it('should return props object', function () {
      props.should.be.a('object');
    });

    it('props required to contain "command" property', function () {
      props.should.have.all.keys(['command']);
      props.command.should.be.a('string');
    });

  });
});
