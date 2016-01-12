'use strict';

// Load Modules
var fs = require('fs');
var path = require('path');
var yaml = require('js-yaml');
var vm = require('vm');

/**
 * Gets file type of file path, and returns the type  of file for processing later.
 * 
 * @param  {string} filePath - Path to file.
 * 
 * @returns {string} type
 */
var getFileType = function(filePath) {
    var types = [
            { re: /(\.json)/ig, type: 'json' },
            { re: /(\.yaml)/ig, type: 'yaml' },
            { re: /(\.yml)/ig, type: 'yaml' },
            { re: /(\.js)/ig, type: 'js' }
        ],
        len = types.length,
        i = 0;
     
    // Check if any valid extensions are already part of path
    for(i; i < len; i++) {
        if(types[i].re.test(filePath)){
            return types[i].type;
        }
    }
        
    return null; 
};

/**
 * Takes a filepath without a extension and tries to assume the extension.
 * 
 * @param  {string} filePath - String represetning the known filepath.
 * @param  {string} dir - Base directory specified in options.
 * 
 * @returns {string} filePath
 */
var resolvePath = function(filePath, dir) {
    var parts = filePath.split(path.sep),
        fileName = parts.pop(),
        exts = ['.json', '.yaml', '.yml', '.js'],
        rootPath = parts.join(path.sep),
        paths = [dir, rootPath],
        addPath = function(element) {
            this.push(fileName + element);
        };
        
    exts.forEach(addPath, paths);
    
    return path.resolve.apply(this, paths);
};

/**
 * Opens JS, JSON, and YAML files to inport data as JS object. Data is saved to key passed in, otherwise defaults to 'data'.
 * All data imported is recorded as a record based on location of parserd data. This allows data to be accessed later and
 * creates block scope for reading the data.
 * 
 * @param  {Object} context - All contextual data needed for plugin to function.
 *                            1. {Object} node - ATS Node to be processed.
 *                            2. {Object} options - Options processed by the parser.
 *                            3. {string} [value] - Value given to actions through attributes.
 *                            4. {string} [key='data'] - Key that output should be saved back as.
 *                            5. {Object} [data={}] - data available for action to use.
 * @param  {records} records - Records controller. Stores our data and delivers context. 
 * 
 * @returns {Object} fragment
 */
exports.run = function(context, records) {
    
    var filePath = context.value,
        namespace = context.key,
        type = null,
        contents;
    
    type = getFileType(filePath);

    // Type is null still, need to assume extension
    if(type === null) {
        filePath = resolvePath(filePath, context.options.dir);
        type = getFileType(filePath);
    } else {
        filePath = path.resolve(context.options.dir, filePath);
    }
    
    if(type === 'yaml') {
        // YAML
        try {
            contents = yaml.safeLoad(fs.readFileSync(filePath, 'utf8')) || {};
        } catch (e) {
            e.message = 'Cannot read YAML file: ' + filePath + '\nError: ' + e.message;
            throw e;
        }
    } else if(type === 'json') {
        // JSON
        try {
            contents = JSON.parse(fs.readFileSync(filePath, 'utf8')) || {};
        } catch (e) {
            e.message = 'Cannot read JSON file: ' + filePath + '\nError: ' + e.message;
            throw e;
        }
    } else {
        // JS
        try {
            contents = vm.runInThisContext(fs.readFileSync(filePath, 'utf8')) || {};
        } catch (e) {
            e.message = 'Cannot read JS file: ' + filePath + '\nError: ' + e.message;
            throw e;
        }        
    }

    // Add Record
    records.insert(namespace, contents, context.node.__location);
    
    return context.node; 
};

/**
 * Gets properties for plugin.
 * 
 * @returns {Object} properties
 */
exports.getProperties = function() {
    var props = {
        type: 'attribute',
        command: 'use',
        bundle: 'default',
        defaults: {
            key: 'data'
        }
    };

    return props;
};