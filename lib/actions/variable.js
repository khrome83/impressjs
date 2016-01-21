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
 * Parses a string for a variable expression. For example replacing `${foobar}` with "Hello World" if the data object is `{foobar: "Hello World"}`
 * 
 * @param  {string} str - String that expression was found true in.
 * @param  {Object} node - ATS Node to use data from.
 * @param  {Object} data - Data passed into impress#compile.
 * 
 * @returns {string} string
 */
exports.run = function(str, node, data) {
    
    // TODO - Need Location which means node
    
    // Need to pull in context object... not str, node and data, should keep it consistent
    // Need to make it possible to have context object created from a different level in parser.js
    return str; 
};

/**
 * Gets properties for plugin.
 * 
 * @returns {Object} properties
 */
exports.getProperties = function() {
    var props = {
        type: 'expression',
        command: '\$\{{1}[\w\s\d+\\.\-*\'\"=]+\}{1}',
        bundle: 'default'
    };

    return props;
};