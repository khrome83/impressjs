'use strict';

// Load Modules
var parse5 = require('parse5');
var _ = require('lodash');
var actions = require('./actions');
var adapter = require('./adapter.js');

// Defaults
var DEFAULT_OPTIONS = {
    compress: null,
    prefix: 'data-imp-',
    dir: './'
};

// Private Properties
var options = DEFAULT_OPTIONS;
var reporter = null;
var manifest = actions.createManifest(['defaults'], options.prefix);

/**
 * Init function to modify options, reporter, or plugins
 * 
 * @param  {Object} [opts={}] - Allows options to be passed in to customize the parser.
 * @param  {any} [rep] - Reporter plugin to use with the parser.
 * @param  {Array<string>} [plugins=['defaults']] - Plugins to be enabled. Include `['defaults']` to get all included plugins if adding external. 
 *                                                  Otherwise specify the individual plugins to use.
 * 
 * @returns {undefined} undefined
 * 
 * @example
 * // Setups up a instance of Impress with default plugins
 * var impress = require(impress);
 * 
 * @example
 * // Setups of a instance of Impress, modifying the plugins parsed
 * var impress = require(impress).init({}, ['test', 'list']);
 *
 */
exports.init = function (opts, rep, plugins) {
    opts = opts || {};
    plugins = plugins || ['defaults'];
	
    options = _.merge({}, DEFAULT_OPTIONS, opts);
    reporter = rep || null;
    manifest = actions.createManifest(plugins, options.prefix);
    
    return {
        manifest: manifest,
        reporter: reporter, 
        options: options
    };
};

/**
 * Runs HTML string through the impress parser to generate TreeAdapter to run all plugins enabled against it.
 * 
 * @param  {string} html - HTML markup to parse as a string. You can either pass in the whole document or a valid fragment of HTML.
 * @param  {Object} [data={}] - Sets the initial data to prime parser with. Additional plugins like `use` can append data to this object in block scope. 
 * 
 * @returns {string} - HTML markup returned as a string. Any Impress commands listed as attributes should be removed.
 */
exports.compile = function (html, data) {
    var opts = {
        locationInfo: true,
        treeAdapter: adapter
    };
    
    data = data || {};
    html = (/^\s*<(!doctype|html|head|body)\b/i.test(html)) ? parse5.parse(html, opts) : parse5.parseFragment(html, opts);
    
    // Do Stuff
    return parse5.serialize(html);
};