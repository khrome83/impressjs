'use strict';

// Require Modules
var chai = require('chai');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Action List Tests
describe('actions/list', function () {
  
  var list;
  
  before(function() {
    list = require('../../lib/actions/list');
  });

  describe('constructor()', function () {

    var action;
    
    before(function() {
      action = list({});
    });
    
    it('should return processed DOM tree', function () {
      action.should.be.a('object');
    });

  });

  describe('#getProperties()', function () {

    var props;
    
    before(function() {
      props = list.getProperties();
    });

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
