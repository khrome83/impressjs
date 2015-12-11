'use strict';

// Load Modules
//var parse5 = require('parse5');
var	_ = require('lodash');
var	actions = require('./actions');

// Defaults
var DEFAULT_OPTIONS = {
	compress: null,
	prefix: 'data-imp-'
};

// Impress
function Impress(options, reporter, plugins) {
	plugins = plugins || ['defaults'];
	
	this.options = _.merge({}, DEFAULT_OPTIONS, options);
	this.reporter = reporter || null;
	this.manifest = actions.createManifest(plugins, this.options.prefix);
}

// API
Impress.prototype.compile = function (html, data) {
	data = data || {};
	
	return html;
};

// Exports
module.exports = Impress;