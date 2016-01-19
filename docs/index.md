# Impress.js Documenation

Impress is a server side templating language that is both customizable through options as well as extensible through plugins. The entire templating language can be customized to the needs of the project. Plugins allow for the language to be extended to do things never thought of. 

The following documentation is still a work in progress, and will have incorrect information until we reach first release.

[How to use Impress](usage.md)

## Impress as a Language

By default the Impress language is heavily opinionated. It is based on the work of Adobe with [Sightly](https://github.com/Adobe-Marketing-Cloud/sightly-spec/blob/master/SPECIFICATION.md). While we document the language through the plugins, the key difference between Sightly and Impress, is that Impress can be easily modified and extended. The opinionated language is designed to be valid HTML, making heavy use of `data-` attributes. Becuase of this, a HTML validator will parse the content as valid HTML. 

## Impress as a Framework

Impress allows for high customization through options. With the options, a user can determine which language features to use, as well as customize parts of the language, like the prefix for the attribute commands. Plugins take this even further by allowing Impress to be extended to add or replace commands within the language. Because of this, each part of the language is broken out as a plugin. 

## Default Plugins

These plugins are included with the project. They can be enabled/disabled as needed, or replaced with an external plugin.

* [List](plugins/list.md) - Loops over array and repeats contents within block scope with data returned.
* [Test](plugins/test.md) - Removes content if falsey within block.
* [Text](plugins/text.md) - Display text within element.
* [Use](plugins/use.md) - Loops over array and repeats contents within block scope with data returned.

## External Plugins

None Yet. Will introduce a sample Markdown plugin soon. 

### How to Build a Plugin for Impress

More Info Soon. Plugin API is still in active development and will change.