'use strict';

// Utility
var Utility = function () {
    this.version = '0.0.1';
};

// API

// Merge two objects together, with 2nd object being mreged into 1st
Utility.prototype.merge = function (obj1, obj2) {
    var sanitize = function(obj) {
        return (obj !== null && Object.prototype.toString.call(obj) === '[object Object]') ? obj : {};
    };

    obj1 = sanitize(obj1);
    obj2 = sanitize(obj2);

    return [obj1, obj2].reduce(function (merged, added) {
        Object.keys(added).forEach(function (key) {
            merged[key] = added[key];
        });

        return merged;
    }, {});
};

// Exports
module.exports = new Utility();