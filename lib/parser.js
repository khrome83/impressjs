'use strict';

// Load Modules
//var _ = require('lodash');

// Private Properties
var _parser = [];

/**
 * Builds context for actions to use. All actions recieve the same context object.
 * 
 * @param  {Object} node - ATS Node to be processed.
 * @param  {Object} props - Plugin properties for configurating the context.
 * @param  {Object} options - Options object.
 * @param  {string} [value] - Value given to actions through attributes.
 * @param  {string} [key] - Key that output should be saved back as.
 * @param  {Object} [data={}] - data available for action to use.
 *
 * @returns {Context} context
 */
var createContext = function(node, props, options, value, key, data) {
    return {
        node: node,
        options: options,
        value: value || '',
        key: key || props.defaults.key,
        data: data || {}
    };
};

var createActionCall = function(node, value, namespace) {
    return {
        node: node,
        namespace: namespace || '',
        value: value || ''
    };
};

var explodeAttribute = function(attr) {
    var parts = attr.name.split('.');
    return {
        command: parts[0],
        namespace: parts[1],
        value: attr.value
    };
};

var parseElement = function(node, manifest) {
    if(!node.tagName && (node.tagName in manifest.element)) {
        return createActionCall(manifest.element[node.tagName], node.tagName, null);
    }
};

var parseId = function(node, manifest) {
    var attrs = node.attrs,
        i = 0,
        attrLength = attrs.length;
        
    for(i; i < attrLength; i++) {
        if(attrs[i].name === 'id' && (attrs[i].value in manifest.id)) {
            return createActionCall(manifest.element[node.tagName], node.tagName, null);
        }    
    }
    
};

// How to handle multiple classes?
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
            return createActionCall(manifest.class[classes[x]], classes[x], null);
        }
    }
};

// How to handle multiple attributes?
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
        
        return createActionCall(manifest.attribute[attr.command], attr.value, attr.namespace);
    }
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

/*
exports.parse = function(tree, manifest) {
    // Element 
    
    
    // ID
    
    
    // Class
    
    
    // Attributes
    
      
};
*/