# getFileType

Gets file type of file path, and returns the type  of file for processing later.

**Parameters**

-   `filePath` **string** Path to file.

Returns **string** type

# getProperties

Gets properties for plugin.

Returns **Object** properties

# run

Opens JS, JSON, and YAML files to inport data as JS object. Data is saved to key passed in, otherwise defaults to 'data'.
All data imported is recorded as a record based on location of parserd data. This allows data to be accessed later and
creates block scope for reading the data.

**Parameters**

-   `context` **Object** All contextual data needed for plugin to function.                           1. {Object} node - ATS Node to be processed.
                               2. {Object} options - Options processed by the parser.
                               3. {string} [value] - Value given to actions through attributes.
                               4. {string} [key='data'] - Key that output should be saved back as.
                               5. {Object} [data={}] - data available for action to use.
-   `records` **records** Records controller. Stores our data and delivers context.

Returns **Object** fragment

# resolvePath

Takes a filepath without a extension and tries to assume the extension.

**Parameters**

-   `filePath` **string** String represetning the known filepath.
-   `dir` **string** Base directory specified in options.

Returns **string** filePath
