'use strict';

// Load Modules

// Test - Impress Action
function test(fragment, data) {
	data = data || {};
	
	return fragment;
}

test.getProperties = function() {
	var props = {
		type: 'attribute',
		command: 'test',
		bundle: 'default'
	};

	return props;
};

// Exports
module.exports = test;