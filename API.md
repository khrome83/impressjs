# Impress

Impress Class, used to intialize a new Impress parser

**Parameters**

-   `options` **[Object]** contains all options user can override (optional, default `{}`)
-   `reporter` **[any]** reporter plugin to use to see progress
-   `plugins` **[Array&lt;string&gt;]** plugins to enables (optional, default `['defaults']`)

**Examples**

```javascript
// setups up a instance of Impress with default plugins
var Impress = require(impress),
    impress = new Impress();
```

```javascript
// setups of a instance of Impress, modifying the plugins parsed
var Impress = require(impress),
    impress = new Impress({}, ['test', 'list']);
```

## compile

runs html string through the impress.js parser to run all plugins enabled against it

**Parameters**

-   `html` **string** markup to parse
-   `data` **[Object]** initial data (optional, default `{}`)

Returns **string** string of html markup
