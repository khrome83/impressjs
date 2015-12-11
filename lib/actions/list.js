'use strict';

// Load Modules

// List - Impress Action
function list(fragment, data) {
	data = data || {};
	
	return fragment;
}

list.getProperties = function() {
	var props = {
		command: 'list',
		bundle: 'default'
	};

	return props;
};

// Exports
module.exports = list;