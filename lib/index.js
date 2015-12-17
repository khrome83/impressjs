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

/**
 * Impress Class, used to intialize a new Impress parser
 * @class
 * @classdesc Impress Parser, and exposed API for node module
 * @param  {any} options
 * @param  {any} reporter
 * @param  {any} plugins
 */
function Impress(options, reporter, plugins) {
	plugins = plugins || ['defaults'];
	
	this.options = _.merge({}, DEFAULT_OPTIONS, options);
	this.reporter = reporter || null;
	this.manifest = actions.createManifest(plugins, this.options.prefix);
}

// API
Impress.prototype.compile = function (html, data) {
	data = data || {};
	html = (/^\s*<(!doctype|html|head|body)\b/i.test(html)) ? parse5.parse(html) : parse5.parseFragment(html);
	
	return html;
};

// Exports
module.exports = Impress;