'use strict';

// Require Modules
var chai = require('chai');
 
// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Action List Tests
describe('actions/use', function () {
  
  var use;
  
  before(function() {
    use = require('../../lib/actions/use');
  });

  describe('#run()', function () {

    //var action;
    
    before(function() {
      //action = use.run({});
    });
    
    it('should return processed DOM tree', function () {
      //action.should.be.a('object');
    });

  });

  describe('#getProperties()', function () {

    var props;
    
    before(function() {
      props = use.getProperties();
    });

    it('should return props object', function () {
      props.should.be.a('object');
    });

    it('props required to contain "command" property', function () {
      props.should.have.property('command');
      props.command.should.be.a('string');
      props.command.should.equal('use');
    });
    
    it('props required to contain "bundle" property of "default"', function () {
      props.should.have.property('bundle');
      props.bundle.should.be.a('string');
      props.bundle.should.equal('default');
    });

    it('props required to contain "type" property of "attribute"', function () {
      props.should.have.property('type');
      props.type.should.be.a('string');
      props.type.should.equal('attribute');
    });

  });

});
