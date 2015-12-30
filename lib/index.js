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
 * @classdesc Impress Parser, and exposed API for node module.
 * @param  {Object} [options={}] - Allows options to be passed in to customize the parser.
 * @param  {any} [reporter] - Reporter plugin to use with the parser.
 * @param  {Array<string>} [plugins=['defaults']] - Plugins to be enabled. Include `['defaults']` to get all included plugins if adding external. 
 *                                                  Otherwise specify the individual plugins to use.
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
 * @param  {string} html - HTML markup to parse as a string. You can either pass in the whole document or a valid fragment of HTML.
 * @param  {Object} [data={}] - Sets the initial data to prime parser with. Additional plugins like `use` can append data to this object in block scope. 
 * @returns {string} - HTML markup returned as a string. Any Impress commands listed as attributes should be removed.
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