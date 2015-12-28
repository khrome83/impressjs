# Impress

Impress Class, used to intialize a new Impress parser.

**Parameters**

-   `options` **[Object]** Contains all options user can override (optional, default `{}`)
-   `reporter` **[any]** Reporter plugin to use to see progress
-   `plugins` **[Array&lt;string&gt;]** Plugins to be enabled (optional, default `['defaults']`)

**Examples**

```javascript
// Setups up a instance of Impress with default plugins
var Impress = require(impress),
    impress = new Impress();
```

```javascript
// Setups of a instance of Impress, modifying the plugins parsed
var Impress = require(impress),
    impress = new Impress({}, ['test', 'list']);
```

## compile

Runs HTML string through the impress parser to generate TreeAdapter to run all plugins enabled against it.

**Parameters**

-   `html` **string** HTML markup to parse, either whole document or fragment
-   `data` **[Object]** Initial data to prime parser with (optional, default `{}`)

Returns **string** HTML markup as string, removing any Impress commands
