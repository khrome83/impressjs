# addPlugin

Adds single plugin or multiple plugins.

**Examples**

```javascript
// Add single plugin to manifest 
impress.addPlugin('use');

// Add multiple plugins to manifest
impress.addPlugin('use', 'test', 'list');

// or use with array
var plugins = ['use', 'test', 'list', 'text'];
impress.addPlugin(plugins);

// alias
impress.addPlugins('use', 'text');
```

Returns **undefined** undefined

# addPlugins

Alias of addPlugin.

# compile

Runs HTML string through the impress parser to generate TreeAdapter to run all plugins enabled against it.

**Parameters**

-   `html` **string** HTML markup to parse as a string. You can either pass in the whole document or a valid fragment of HTML.
-   `data` **[Object]** Sets the initial data to prime parser with. Additional plugins like `use` can append data to this object in block scope. (optional, default `{}`)

Returns **string** HTML markup returned as a string. Any Impress commands listed as attributes should be removed.

# init

Init function to modify options, reporter, or plugins

**Parameters**

-   `options` **[Object]** Allows options to be passed in to customize the parser. (optional, default `{}`)
-   `reporter` **[any]** Reporter plugin to use with the parser.
-   `plugins` **[Array&lt;string&gt;]** Plugins to be enabled. Include `['defaults']` to get all included plugins if adding external. 
                                                     Otherwise specify the individual plugins to use. (optional, default `['defaults']`)

**Examples**

```javascript
// Setups up a instance of Impress with default plugins
var impress = require(impress);
```

```javascript
// Setups of a instance of Impress, modifying the plugins parsed
var impress = require(impress).init({}, ['test', 'list']);
```

Returns **undefined** undefined

# reporter

Sets a reporter to be used with running the plugin.

**Parameters**

-   `reporter` **[Reporter]** Reporter to run against actions. (optional, default `null`)

Returns **Reporter** reporter

# setDirectory

Set base directory to use files from. This allows you to ommit this from paths in actions.

**Parameters**

-   `dir` **string** Base directory to load data files from.

Returns **undefined** undefined

# setPrefix

Set the prefix for attribute based actions and plugins.

**Parameters**

-   `prefix` **any** Prefix for any attribute actions.

Returns **undefined** undefined
