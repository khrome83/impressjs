'use strict';

// Require Modules
var chai = require('chai');
var rewire = require('rewire');

// Chai Settings
chai.config.includeStack = true; // turn on stack trace
chai.config.truncateThreshold = 0; // disable truncating

// Action List Tests
describe('actions/use', function () {
  
  var use, records;
  
  before(function() {
    use = rewire('../../lib/actions/use');
    records = rewire('../../lib/records');
  });

  describe('#run()', function () {
      
    var context;
  
    before(function() {
      var options = rewire('../../lib/index').__get__('DEFAULT_OPTIONS');
      options.dir = './test/files/';
      
      var node = {
        'nodeName': 'h1',
        'tagName': 'h1',
        'attrs': [
            {
              'name': 'data-imp-use.data',
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
        value: 'fruit.yml',
        key: 'data',
        data: {}
      };
    });
    
    beforeEach(function() {
      records.__set__('records', []);
    });
    
    it('should return processed DOM tree', function () {
      var action = use.run(context, records);
      action.should.be.a('object');
    });

    it('should read yml file and insert records', function () {
      use.run(context, records);
      var data = records.__get__('records')[0].data;
       
      data.should.be.a('object');
      data.should.contain.any.keys(['recipe', 'vegtables', 'meat', 'fruit', 'count', 'steps', 'ingredients']);
    });

    it('should read yaml file and insert records', function () {
      context.value = 'fruit.yaml';
      use.run(context, records);
      var data = records.__get__('records')[0].data;
       
      data.should.be.a('object');
      data.should.contain.any.keys(['recipe', 'vegtables', 'meat', 'fruit', 'count', 'steps', 'ingredients']); 
    });

    it('should read json file and insert records', function () {
      context.value = 'fruit.json';
      use.run(context, records);
      var data = records.__get__('records')[0].data;
       
      data.should.be.a('object');
      data.should.contain.any.keys(['recipe', 'vegtables', 'meat', 'fruit', 'count', 'steps', 'ingredients']); 
    });

    it('should read js file and insert records', function () {
      context.value = 'fruit.js';
      use.run(context, records);
      var data = records.__get__('records')[0].data;
       
      data.should.be.a('object');
      data.should.contain.any.keys(['recipe', 'vegtables', 'meat', 'fruit', 'count', 'steps', 'ingredients']);
    });

    it('should read file with unknown extension and insert records', function () {
      context.value = 'fruit';
      use.run(context, records);
      var data = records.__get__('records')[0].data;
       
      data.should.be.a('object');
      data.should.contain.any.keys(['recipe', 'vegtables', 'meat', 'fruit', 'count', 'steps', 'ingredients']);
    });
    
    it('should emmit error message if no file exists with name reguardless of extension', function() {
      context.value = 'steak';
      
      // Have to initiate this way because of should
      (function() {
        use.run(context, records);
      }).should.throw(Error);  
    });
    
    it('should emmit error message if yaml/yml file cannot be read', function(){
      context.value = 'steak.yaml';
      
      // Have to initiate this way because of should
      (function() {
        use.run(context, records);
      }).should.throw(Error);
    });

    it('should emmit error message if json file cannot be read', function(){
      context.value = 'steak.json';
      
      // Have to initiate this way because of should
      (function() {
        use.run(context, records);
      }).should.throw(Error);
    });

    it('should emmit error message if js cannot be read', function(){
      context.value = 'steak.js';
      
      // Have to initiate this way because of should
      (function() {
        use.run(context, records);
      }).should.throw(Error);
    });
  });

  describe('#getProperties', function () {

    var props;
    
    before(function() {
      props = use.getProperties;
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
