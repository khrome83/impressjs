'use strict';

// Load Modules
var parse5 = require('parse5'),
	_ = require('lodash');

// Default Options
var DEFAULT_OPTIONS = {
	compress: null,
	document: "<html></html>",
	reporter: {}
}

// Parser
var Parser = function Parser(options) {
	this.options = _.merge(DEFAULT_OPTIONS, options);	
};

// API
Parser.prototype.parse = function (html) {
	return this.document;
};

// Exports
module.exports = Parser;