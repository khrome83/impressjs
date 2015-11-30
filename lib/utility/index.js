'use strict';

// Utility
var Utility = function () {

};

// API
Utility.prototype.merge = function (defaults, options) {
    options = options || {};

    return [defaults, options].reduce(function (merged, optObj) {
        Object.keys(optObj).forEach(function (key) {
            merged[key] = optObj[key];
        });

        return merged;
    }, {});
};

// Exports
module.exports = new Utility();