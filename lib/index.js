'use strict';

// Load Modules
var parse5 = require('parse5'),
	_ = require('lodash');

// Default Options
var defaults = {
		compress: null,
		prefix: 'data-imp-'
	};

// Impress
function Impress(options, reporter) {
	this.options = _.merge({}, defaults, options);
	this.reporter = reporter || null;
}

// API
Impress.prototype.compile = function (html, data) {
	
	return html;
};

// Exports
module.exports = Impress;