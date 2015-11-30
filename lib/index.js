'use strict';

// Load Modules
var Parser = require('./parser'),
	Utility = require('./utility');

// Template
exports.compile = function compile(html, options, reporter) {
	var parser = new Parser(options, reporter);
	
	return parser.parse(html);
};