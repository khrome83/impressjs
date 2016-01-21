'use strict';

// Private Variables
var _deps = {};

/**
 * Imports all dependencies that are exposed to a plugin.
 * 
 * @param  {Object} deps - Any dependencies that are exposed to a plugin.
 * 
 * @returns {undefined} undefined
 */
exports.init = function(deps) {
    _deps = deps;
}

/**
 * Creates a text node as a ChildNode within the passed in node. Value of attribute is text to be inserted into Text Node.
 * 
 * @param  {Object} context - Actions context when it runs
 * 
 * @returns {Object} fragment
 */
exports.run = function(context) {

    _deps.adapter.insertText(context.node, context.value, true);
    
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