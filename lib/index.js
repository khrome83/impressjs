'use strict';

// Load Modules
var parse5 = require('parse5'),
	_ = require('lodash'),
	actions = require('./actions');

// Defaults
var DEFAULT_OPTIONS = {
		compress: null,
		prefix: 'data-imp-'
	};

// Impress
function Impress(options, reporter, actions, plugins) {
	actions = actions || [];
	plugins = plugins  || [];
	
	this.options = _.merge({}, DEFAULT_OPTIONS, options);
	this.reporter = reporter || null;
	this.manifest = actions.createManifest(this.options.prefix, actions, plugins);
	
}

// API
Impress.prototype.compile = function (html, data) {
	
	return html;
};

// Exports
module.exports = Impress;