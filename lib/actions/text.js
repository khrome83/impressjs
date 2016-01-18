'use strict';

// Load Modules
var adapter = require('../adapter');

/**
 * Creates a text node as a ChildNode within the passed in node. Value of attribute is text to be inserted into Text Node.
 * 
 * @param  {Object} context - Actions context when it runs
 * 
 * @returns {Object} fragment
 */
exports.run = function(context) {

    adapter.insertText(context.node, context.value, true);
    
    return context.node; 
};

/**
 * Gets properties for plugin.
 * 
 * @returns {Object} properties
 */
exports.getProperties = function() {
    var props = {
        type: 'attribute',
        command: 'text',
        bundle: 'default'
    };

    return props;
};