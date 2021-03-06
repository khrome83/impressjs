'use strict';

// Private Variables
//var _deps = {};

/**
 * Imports all dependencies that are exposed to a plugin.
 * 
 * //@param  {Object} deps - Any dependencies that are exposed to a plugin.
 * 
 * @returns {undefined} undefined
 */
exports.init = function(/*deps*/) {
//    _deps = deps;
};

/**
 * @param  {Object} node - ATS Node to be processed
 * @param  {string} [value] - Value given to actions through attributes.
 * @param  {string} [key] - Key that output should be saved back as
 * @param  {Object} [data={}] - data available for action to use.
 * 
 * @returns {Object} fragment
 */
exports.run = function(node, value, key, data) {
    value = value || '';
    key = key || '';
    data = data || {};
	
    return node; 
};

/**
 * Gets properties for plugin.
 * 
 * @returns {Object} properties
 */
exports.getProperties = {
    type: 'attribute',
    command: 'test',
    bundle: 'default'
};