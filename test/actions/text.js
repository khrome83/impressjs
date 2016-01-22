'use strict';

// Require Modules
var chai = require('chai');
var rewire = require('rewire');

// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Action List Tests
describe('actions/text', function () {
  
  var text;
  
  before(function() {
    text = rewire('../../lib/actions/text');
  });

  describe('#run()', function () {
      
    var context;
  
    before(function() {
      var options = rewire('../../lib/index').__get__('DEFAULT_OPTIONS');
      
      var node = {
        'nodeName': 'h1',
        'tagName': 'h1',
        'attrs': [
            {
              'name': 'data-imp-text',
              'value': 'fruit.yml'
            }
        ],
        'namespaceURI': 'http://www.w3.org/1999/xhtml',
        'childNodes': [
            {
              'nodeName': '#text',
              'value': 'My First Heading',
              'parentNode': '[Circular ~.childNodes.1.childNodes.1.childNodes.1]',
              '__location': {
                'line': 5,
                'col': 33,
                'startOffset': 63,
                'endOffset': 79
              }
            }
        ],
        '__location': {
          'line': 5,
          'col': 5,
          'startOffset': 35,
          'endOffset': 84,
          'attrs': {
            'data-imp-use': {
              'line': 5,
              'col': 9,
              'startOffset': 39,
              'endOffset': 62
            }
          }
        }
      };

      context = {
        node: node,
        options: options,
        value: 'Hello World',
        key: 'data',
        data: {}
      };
    });

    it('should replace text in existing text node', function () {
      var textString = text.run(context).childNodes[0].value;
       
      textString.should.equal(context.value); 
    });
    
    it('should insert new text node', function () {
      context.node.childNodes = [];
      context.node.childNodes.should.be.empty;
      
      var textString = text.run(context).childNodes[0].value;
      
      textString.should.equal(context.value); 
    });

  });

  describe('#getProperties', function () {

    var props;
    
    before(function() {
      props = text.getProperties;
    });

    it('should return props object', function () {
      props.should.be.a('object');
    });

    it('props required to contain "command" property', function () {
      props.should.have.property('command');
      props.command.should.be.a('string');
      props.command.should.equal('text');
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
