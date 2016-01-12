'use strict';

// Load Modules
var _ = require('lodash');

// Variables
var records = [];
var cache = {};

/**
 * Creates a record object to represent the data and the scope of data.
 *
 * @private 
 * @param  {string} key - Namespace to recal data with from view within block scope.
 * @param  {Object} data - Data to be accessed later.
 * @param  {number} start - Start of block scope.
 * @param  {number} end - End of block scope.
 * 
 * @returns {Record} record
*/
var createRecord = function(key, data, start, end) {
    return {
        scope: [start, end],
        key: key, 
        data: data
    };
};

/**
 * Creates a set of records that match the marker passed in.
 * 
 * @param  {number} marker - Marker of where to focus the context around.
 * 
 * #returns {Object} record set
 */
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

/**
 * Get's the start offset from location data.
 * 
 * @param  {Object} location - ATS Node location object.
 * 
 * @returns {number} start offset
 */
var getStart = function(location) {
    return location.startOffset;
};

/**
 * Get's the end offset from location data.
 * 
 * @param  {Object} location - ATS Node location object.
 * 
 * @returns {number} end offset
 */
var getEnd = function(location) {
    return location.endOffset; 
};

/**
 * Adds data to cache with marker as key.
 * 
 * @param  {number} marker - Location marker to identify data later.
 * @param  {Object} data - Record set of data.
 * 
 * @returns {undefined} undefined
 */
var addCache = function(marker, data) {
    cache[marker] = data;
};

/**
 * Gets a set of records cached with the marker as the key.
 * 
 * @param  {number} marker - Location number used to save entries in cache.
 * 
 * @returns {Object} record set
 */
var getCachedEntry = function(marker) {
    return cache[marker];
};

/**
 * Checks if a marker exists within the cache for that record set.
 * 
 * @param  {number} marker - Location number used to save entries in cache.
 * 
 * @returns {boolean} boolean
 */
var isCached = function(marker) {
    return cache[marker] !== undefined;
};

// Public

/**
 * Inserts a record into the record set.
 * 
 * @param  {string} key - Namespace to access the data with.
 * @param  {Object} data - Data imported into the record entry.
 * @param  {Object} location - ATS Node location info.
 * 
 * @returns {undefined} undefined
 */
exports.insert = function (key, data, location) {
    records.push(createRecord(key, data, getStart(location), getEnd(location)));
};

/**
 * Retrieves all records that are releavent to the same scope as the location.
 * 
 * @param  {Object} location - ATS Node location info.
 * @param  {Object} data - External data that should be merged with record set on retrieval. 
 *                         This data does not get saved to the record, it is just merged for
 *                         easier access. This is typically the data passed into the Impress.js
 *                         compile function.
 * 
 * @returns {Object} scope based record set
 */
exports.retrieveScope = function (location, data) {
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

