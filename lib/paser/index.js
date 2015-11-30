'use strict';

// Load Modules
var parse5 = require('parse5'),
	Utility = require('../utility');

// Default Options
var DEFAULT_OPTIONS = {
	compress: null,
	reporter: {}
}

// Parser
var Parser = function (options) {
	this.options = Utility.merge(DEFAULT_OPTIONS, options);	
};

// API
Parser.prototype.parse = function (html) {
	var document = "<html></html>";
		
	return document;
};

// Exports
module.exports = Parser;