'use strict';

// Load Modules
var _ = require('lodash');

// Records
var Records = (function () {
    var records = [],
        cache = {};

    // Private
    var createRecord = function(key, data, start, end) {
        return {
            scope: [start, end],
            key: key, 
            data: data
        };
    };

    var createRecordSet = function(marker) {
        var context = {
                selected: {},
                marker: marker
            },
            testRecord = function(element) {
                if( this.marker >= element.scope[0] && this.marker <= element.scope[1]) {
                    this.selected[element.key] = element.data;
                }
            };
            
        records.forEach(testRecord, context);
        
        return context.selected;
    };

    var getStart = function(location) {
        return location.startOffset;
    };

    var getEnd = function(location) {
        return location.endOffset; 
    };

    var addCache = function(marker, data) {
        cache[marker] = data;
    };

    var getCachedEntry = function(marker) {
        return cache[marker];
    };

    var isCached = function(marker) {
        return cache[marker] !== undefined;
    };

    // Public
    var insert = function (key, data, location) {
        records.push(createRecord(key, data, getStart(location), getEnd(location)));
    };

    var retrieveScope = function (location, data) {
        data = data || {};
        
        var marker = getStart(location),
            records;
        
        if(isCached(marker)) {
            records = getCachedEntry(marker);
        } else {
            records = createRecordSet(marker);
            addCache(marker, records);
        }
        
        return _.merge({}, data, records);
    };

    var reset = function() {
        records = [];
        cache = {};
    };

    return {
        insert: insert,
        retrieveScope: retrieveScope,
        reset: reset
    };

})();

// Exports
module.exports = Records;

