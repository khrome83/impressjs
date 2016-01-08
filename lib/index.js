'use strict';

// Load Modules
var parse5 = require('parse5');
var _ = require('lodash');
var actions = require('./actions');
var adapter = require('./adapter.js');
var parser = require('./parser.js');
var records = require('./records.js');

// Defaults
var DEFAULT_OPTIONS = {
    compress: null,
    prefix: 'data-imp-',
    dir: './'
};

// Private Properties
var _options = DEFAULT_OPTIONS;
var _reporter = null;
var _plugins = ['defaults'];
var _manifest = updateManifest(_plugins, _options.prefix);

/**
 * Runs createManifest command, as well as setting up the parser for the new Manifest.
 * 
 * @param  {Array<string>} plugins - List of plugins to enable.
 * @param  {string} prefix - Prefix before any attribute commands.
 * 
 * @returns {undefined} undefined
 */
var updateManifest = function(plugins, prefix) {
    var output = actions.createManifest(plugins, prefix);
    parser.setup(output);
    
    return output;
};


/**
 * Init function to modify options, reporter, or plugins
 * 
 * @param  {Object} [options={}] - Allows options to be passed in to customize the parser.
 * @param  {any} [reporter] - Reporter plugin to use with the parser.
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
exports.init = function (options, reporter, plugins) {
    options = options || {};
    _plugins = plugins || _plugins;
	
    _options = _.merge({}, DEFAULT_OPTIONS, _options, options);
    _reporter = reporter || null;
    _manifest = updateManifest(_plugins, _options.prefix);
    
    return {
        manifest: _manifest,
        reporter: _reporter, 
        options: _options,
        plugins: _plugins
    };
};

/**
 * Set the prefix for attribute based actions and plugins.
 * 
 * @param  {any} prefix - Prefix for any attribute actions.
 * 
 * @returns {undefined} undefined
 */
exports.setPrefix = function (prefix) {
    _options.prefix = prefix;
    _manifest = updateManifest(_plugins, _options.prefix);
};

/**
 * Set base directory to use files from. This allows you to ommit this from paths in actions.
 * 
 * @param  {string} dir - Base directory to load data files from.
 * 
 * @returns {undefined} undefined
 */
exports.setDirectory = function (dir) {
    _options.dir = dir;
};

/**
 * Sets a reporter to be used with running the plugin.
 * 
 * @param  {Reporter} [reporter=null] - Reporter to run against actions.
 * 
 * @returns {Reporter} reporter
 */
exports.reporter = function (reporter) {
    return (!reporter) ? _reporter : _reporter = reporter;
};

/**
 * Adds single plugin or multiple plugins.
 * 
 * @returns {undefined} undefined
 * 
 * @example
 * // Add single plugin to manifest 
 * impress.addPlugin('use');
 * 
 * // Add multiple plugins to manifest
 * impress.addPlugin('use', 'test', 'list');
 * 
 * // or use with array
 * var plugins = ['use', 'test', 'list', 'text'];
 * impress.addPlugin(plugins);
 *
 * // alias
 * impress.addPlugins('use', 'text');
 */
var addPlugin = exports.addPlugin = function () {
    var args = new Array(arguments.length),
        i = 0,
        len = args.length;
        
    for(i; i < len; ++i) {
        args[i] = arguments[i];
    }
    
    _plugins = _.union(_plugins, (Array.isArray(args[0])) ? args[0] : args);
    _manifest = updateManifest(_plugins, _options.prefix);
};

/**
 * Alias of addPlugin.
 */
exports.addPlugins = addPlugin;

/**
 * Runs HTML string through the impress parser to generate TreeAdapter to run all plugins enabled against it.
 * 
 * @param  {string} html - HTML markup to parse as a string. You can either pass in the whole document or a valid fragment of HTML.
 * @param  {Object} [data={}] - Sets the initial data to prime parser with. Additional plugins like `use` can append data to this object in block scope. 
 * 
 * @returns {string} - HTML markup returned as a string. Any Impress commands listed as attributes should be removed.
 */
exports.compile = function (html, data) {
    var options = {
        locationInfo: true,
        treeAdapter: adapter
    };

    var tree = (/^\s*<(!doctype|html|head|body)\b/i.test(html)) ? parse5.parse(html, options) : parse5.parseFragment(html, options);
    
    
    var output = parser.parse(tree, _manifest, _options, data, records);
    
    // Do Stuff
    return parse5.serialize(output[0]);
};