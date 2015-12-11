'use strict';

// Load Modules
var _ = require('lodash');

// Defaults
var DEFAULT_ACTIONS = ['test', 'list'];

// Actions Support Functions
var Actions = function Actions() {};

// API
Actions.prototype.createManifest = function (plugins, prefix) {
	
	if (_.indexOf(plugins, 'defaults') !== -1) {
		plugins = _.union(plugins, DEFAULT_ACTIONS);
		_.pull(plugins, 'defaults');
	} else {
		plugins = _.uniq(plugins);
	}
	
	var manifest = {},
		len = plugins.length,
		i = 0;
		
	for(i; i < len; i++) {
		var action, key, internal = true;
		
		// Require Local if its a built in Action
		if (_.indexOf(DEFAULT_ACTIONS, plugins[i]) !== -1) {
			action = require('./actions/' + plugins[i]);
		} else {
			action = require(plugins[i]);
			internal = false;
		}
		
		key = prefix + action.getProperties().command;
		
		if(internal && _.has(manifest, key))
			continue;
		
		manifest[key] = action; 
	}
	
	return manifest;
};


// Exports
module.exports = new Actions();