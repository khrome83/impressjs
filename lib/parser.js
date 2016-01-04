'use strict';

// Load Modules
//var _ = require('lodash');

exports.parseAttribute = function(attr) {
    var parts = attr.name.split('.');
    return {
        command: parts[0],
        namespace: parts[1],
        value: attr.value
    };
};

exports.triggerAttribute = function() {
    
};

exports.triggerPlugin = function() {
    
};