'use strict';

// Load Modules
var _ = require('lodash');

// Private Properties
var _parsers = {};

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

/**
 * Creates a object that represents the actions information needed to call it correctly
 * 
 * @param  {Object} action - The plugin that represents the action.
 * @param  {string} [value=''] - Value of class, id, or attribute parsed.
 * @param  {string} [namespace=''] - Any namespace provided by the attribute syntax (ex. data-imp-test.valid - valid is the namespace)
 * 
 * @returns {Object} action call
 */
var createActionCall = function(action, value, namespace) {
    return {
        action: action,
        namespace: namespace || '',
        value: value || ''
    };
};

/**
 * Explodes a attribute from a ATS Node into the three peices that the plugins needs.
 * 
 * @param  {Object} attr - Attribute from a ATS Node attribute array
 * 
 * @returns {Object} attribute
 */
var explodeAttribute = function(attr) {
    var parts = attr.name.split('.');
    return {
        command: parts[0],
        namespace: parts[1],
        value: attr.value
    };
};

/**
 * Parses a node and determines if it's tag name exists within the manifest.
 * 
 * @param  {Object} node - ATS Node to parse.
 * @param  {Object} manifest - Manifest of plugin data.
 * 
 * @returns {Object} Action Call
 */
var parseElement = function(node, manifest) {
    if(!node.tagName && (node.tagName in manifest.element)) {
        return createActionCall(manifest.element[node.tagName], node.tagName, null);
    }
};

/**
 * Parses a node and determines if it's ID exists within the manifest.
 * 
 * @param  {Object} node - ATS Node to parse.
 * @param  {Object} manifest - Manifest of plugin data.
 * 
 * @returns {Object} Action Call
 */
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

/**
 * Parses a node and determines if it's classes exists within the manifest.
 * 
 * @param  {Object} node - ATS Node to parse.
 * @param  {Object} manifest - Manifest of plugin data.
 * 
 * @returns {Array<Object>} Array of Action Calls
 */
var parseClasses = function(node, manifest) {
    var attrs = node.attrs,
        i = 0,
        attrLength = attrs.length;
        
    for(i; i < attrLength; i++) {
        if(attrs[i].name !== 'class') {
            continue;
        }
            
        var classes = attrs[i].value.split(' '),
            x = 0,
            classLength = classes.length,
            actions = [];
            
        for(x; x < classLength; x++) {
            if(!(classes[x] in manifest.class)) {
                continue;
            }
            actions.push(createActionCall(manifest.class[classes[x]], classes[x], null));
        }
        
        return actions;
    }
};

/**
 * Parses a node and determines if it's attributes exists within the manifest.
 * 
 * @param  {Object} node - ATS Node to parse.
 * @param  {Object} manifest - Manifest of plugin data.
 * 
 * @returns {Array<Object>} Array of Action Calls
 */
var parseAttributes = function(node, manifest) {
    var attrs = node.attrs,
        i = 0,
        attrLength = attrs.length,
        actions = [];

    for(i; i < attrLength; i++) {
        if(attrs[i].name === 'class' || attrs[i].name === 'id') {
            continue;
        }
        
        var attr = explodeAttribute(attrs[i]);
        
        if(!(attr.command in manifest.attribute)) {
            continue;
        }
        
        actions.push(createActionCall(manifest.attribute[attr.command], attr.value, attr.namespace));
    }
    
    return actions;
};

/**
 * Runs a node through all relevant parsers.
 * 
 * @param  {Object} node - ATS Node to parse.
 * @param  {Object} manifest - Manifest of plugin data.
 * @param  {Objeft} options - Options to run parser and plugins with.
 * @param  {Object} data - Data primed into the parser.
 * @param  {Object} records - Records modules that allows for the storing of records.
 * 
 * @returns {Object} Node
 */
var parseNode = function(node, manifest, options, data, records) {
    var actions = [],
        i = 0,
        len;

    for(var parser in _parsers) {
        actions.push(_parsers[parser](node, manifest));
    }
    
    actions = _.flatten(actions);
    
    for(i, len = actions.length; i < len; i++) {
        var entry = actions[i],
            props = entry.action.getProperties(),
            context = createContext(node, props, options, entry.value, entry.namespace, data);
            
        node = entry.action.run(context, records);
    }
    
    return node;
};

/**
 * Setup method that uses the manifest to build out a list of parsers that need to run over nodes.
 * 
 * @param  {Object} manifest - Manifest of plugin data.
 * 
 * @returns {undefined} undefined
 */
exports.setup = function(manifest) {
    _parsers = {};
    
    // Check if we have Element plugins
    if(Object.keys(manifest.element).length > 0) {
        // Parser for Element
        _parsers['element'] = parseElement;
    }
    
    // Check if we have ID plugins
    if(Object.keys(manifest.id).length > 0) {
        // Parser for Id
        _parsers['id'] = parseId;
    }
    
    // Check if we have Class plugins
    if(Object.keys(manifest.class).length > 0) {
        // Parser for Class
        _parsers['class'] = parseClasses;
    }
    
    // Check if we have Attribute plugins
    if(Object.keys(manifest.attribute).length > 0) {
        // Parser for Attribute
        _parsers['attribute'] = parseAttributes;
    }
};

/**
 * Parse method that takes a tree and parses through the tree, recursivly calling itself.
 * 
 * @param  {Object} tree - ATS Nodes to parse.
 * @param  {Object} manifest - Manifest of plugin data.
 * @param  {Objeft} options - Options to run parser and plugins with.
 * @param  {Object} data - Data primed into the parser.
 * @param  {Object} records - Records modules that allows for the storing of records.
 * 
 * @returns {Object} tree
 */
var parse = exports.parse = function(tree, manifest, options, data, records) {
    
    if(!Array.isArray(tree)) {
        tree = [tree];
    }
    
    var i = 0,
        len = tree.length;
    
    for(i; i < len; i++) {
        var node = parseNode(tree[i], manifest, options, data, records);
        
        // ToDo: Need callback? Need Promise?
        if(node.childNodes && node.childNodes.length > 0) {
            node.childNodes = parse(node.childNodes, manifest, options, data, records);
        }
        
        tree[i] = node;
    }
    
    return tree;
};