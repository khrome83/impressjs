'use strict';

// Load Modules
var Parser = require('./parser');
	
var parser;
exports = module.exports = function (options, reporter) {
	parser = new Parser(options, reporter);
	return exports;
};

// Compile Template
exports.compile = function compile(html, data) {
	return parser.parse(html);
};

exports.parser;