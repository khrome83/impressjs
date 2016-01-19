'use strict';

// Load Modules
var _ = require('lodash');

// Defaults
var DEFAULT_ACTIONS = ['test', 'list', 'use', 'text'];

/**
 * Creates a manifest of all plugins to run code against.
 * 
 * @private
 * @param  {Array} plugins - Set of plugins to initiation of use as part of the parser.
 * @param  {string} prefix - Prefix to be added before any attribute command.
 * 
 * @returns {Object} manifest
 */
exports.createManifest = function (plugins, prefix) {
	
    if (_.indexOf(plugins, 'defaults') !== -1) {
        plugins = _.union(plugins, DEFAULT_ACTIONS);
        _.pull(plugins, 'defaults');
    } else {
        plugins = _.uniq(plugins);
    }
	
    var manifest = {
            element: {},
            attribute: {},
            class: {},
            id: {}
        },
        len = plugins.length,
        i = 0;
		
    for(i; i < len; i++) {
        var action, props, key, internal = true;
		
		// Require Local if its a built in Action
        if (_.indexOf(DEFAULT_ACTIONS, plugins[i]) !== -1) {
            action = require('./actions/' + plugins[i]);
        } else {
            action = require(plugins[i]);
            internal = false;
        }
		
        props = action.getProperties();
        key = (props.type === 'attribute') ? prefix + props.command : props.command;
		
        if(internal && _.has(manifest[props.type], key))
            continue;
		
        manifest[props.type][key] = action;
    }
	
    return manifest;
};