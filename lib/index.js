/*
'use strict';

// Load modules

//const Processor = require('./fileload');

// Declare internals

//const internals = {};

//exports.Processor = Processor;


const parse5 = require('parse5');
const utils = require('parse5-utils');

var parser = new parse5.Parser();
var parser2 = new parse5.Parser(parse5.TreeAdapters.htmlparser2);
var html = '<!DOCTYPE html><html><head></head><body><title>Parse5 is &#102;&#117;&#99;&#107;ing awesome!</title><h1>42</h1><p>testing paragraph</p><ul><li><a title="Home" href="index.html>Go Home</a></li><li><a title="Forward" href="forward.html">Go Forward</a></li></ul></body></html>';

//Then feed it with an HTML document 
var document = parser.parse(html);
var document2 = parser2.parse(html);
 
//Now let's parse HTML-snippet 
var fragment = parser.parseFragment('<title>Parse5 is &#102;&#117;&#99;&#107;ing awesome!</title><h1>42</h1>');
 
console.log(document2);

// console.log(fragment);
*/

'use strict';

// Load Modules
var Parser = require('./parser');

// Template
exports.compile = function compile(html, options, reporter) {
	var parser = new Parser(options, reporter);
	
	return parser.parse(html);
};