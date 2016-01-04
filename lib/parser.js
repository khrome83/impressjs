'use strict';

// Load Modules
//var _ = require('lodash');

// Private Properties
var _parser = [];

// TODO - Move createContext Here....

var parseElement = function(node, manifest) {
    if(!node.tagName && (node.tagName in manifest.element)) {
        // TODO - Add Context
        manifest.element[node.tagName].run();
    }
};

var parseId = function(node, manifest) {
    var attrs = node.attrs,
        i = 0,
        attrLength = attrs.length;
        
    for(i; i < attrLength; i++) {
        if(attrs[i].name === 'id' && (attrs[i].value in manifest.id)) {
            // TODO - Add Context 
            manifest.id[attrs[i].value].run();
            break;
        }    
    }
    
};

var parseClass = function(node, manifest) {
    var attrs = node.attrs,
        i = 0,
        attrLength = attrs.length;
        
    for(i; i < attrLength; i++) {
        if(attrs[i].name !== 'class') {
            continue;
        }
            
        var classes = attrs[i].value.split(' '),
            x = 0,
            classLength = classes.length;
            
        for(x; x < classLength; x++) {
            if(!(classes[x] in manifest.class)) {
                continue;
            }
            // TODO - Add Context 
            manifest.class[classes[x]].run();
        }
    }
};

var parseAttribute = function(node, manifest) {
    var attrs = node.attrs,
        i = 0,
        attrLength = attrs.length;

    for(i; i < attrLength; i++) {
        if(attrs[i].name === 'class' || attrs[i].name === 'id') {
            continue;
        }
        
        var attr = explodeAttribute(attrs[i]);
        
        if(!(attr.command in manifest.attribute)) {
            continue;
        }
        
        // TODO - Add Context
        manifest.attribute[attr.command].run();
    }
};

var explodeAttribute = exports.explodeAttribute = function(attr) {
    var parts = attr.name.split('.');
    return {
        command: parts[0],
        namespace: parts[1],
        value: attr.value
    };
};

exports.setup = function(manifest) {
    _parser = {};
    
    // Check if we have Element plugins
    if(Object.keys(manifest.element).length > 0) {
        // Parser for Element
        _parser['element'] = parseElement;
    }
    
    // Check if we have ID plugins
    if(Object.keys(manifest.id).length > 0) {
        // Parser for Id
        _parser['id'] = parseId;
    }
    
    // Check if we have Class plugins
    if(Object.keys(manifest.class).length > 0) {
        // Parser for Class
        _parser['class'] = parseClass;
    }
    
    // Check if we have Attribute plugins
    if(Object.keys(manifest.attribute).length > 0) {
        // Parser for Attribute
        _parser['attribute'] = parseAttribute;
    }
        
};

exports.parse = function(tree, manifest) {
    // Element 
    
    
    // ID
    
    
    // Class
    
    
    // Attributes
    
      
};