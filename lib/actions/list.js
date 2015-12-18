'use strict';

// Load Modules

// List - Impress Action
function list(fragment, data) {
	data = data || {};
	
	return fragment;
}

// Returns properties of the plugin
list.getProperties = function() {
	var props = {
		type: 'attribute',
		command: 'list',
		bundle: 'default'
	};

	return props;
};

// Exports
module.exports = list;