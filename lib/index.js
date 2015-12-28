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
 * Impress Class, used to intialize a new Impress parser.
 * 
 * @class
 * @classdesc Impress Parser, and exposed API for node module
 * @param  {Object} [options={}] - Contains all options user can override
 * @param  {any} [reporter] - Reporter plugin to use to see progress
 * @param  {Array<string>} [plugins=['defaults']] - Plugins to be enabled
 * @example
 * // Setups up a instance of Impress with default plugins
 * var Impress = require(impress),
 *     impress = new Impress();
 * @example
 * // Setups of a instance of Impress, modifying the plugins parsed
 * var Impress = require(impress),
 *     impress = new Impress({}, ['test', 'list']);
 */
function Impress(options, reporter, plugins) {
    options = options || {};
    plugins = plugins || ['defaults'];
	
    this.options = _.merge({}, DEFAULT_OPTIONS, options);
    this.reporter = reporter || null;
    this.manifest = actions.createManifest(plugins, this.options.prefix);
}

/**
 * Runs HTML string through the impress parser to generate TreeAdapter to run all plugins enabled against it.
 * 
 * @param  {string} html - HTML markup to parse, either whole document or fragment
 * @param  {Object} [data={}] - Initial data to prime parser with
 * @returns {string} - HTML markup as string, removing any Impress commands
 */
Impress.prototype.compile = function (html, data) {
    var options = {
        locationInfo: true
    };
    
    data = data || {};
    html = (/^\s*<(!doctype|html|head|body)\b/i.test(html)) ? parse5.parse(html, options) : parse5.parseFragment(html, options);
    
    // Do Stuff
    return parse5.serialize(html);
};

// Exports
module.exports = Impress;