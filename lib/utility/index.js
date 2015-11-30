'use strict';

// Utility
var Utility = function () {
	return true;
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
module.exports = Utility;