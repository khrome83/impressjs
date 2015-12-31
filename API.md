# adoptAttributes

Copies attributes to the given node. Only attributes that are not yet present in the node are copied.

**Parameters**

-   `recipientNode` **ASTNode** Node to copy attributes into.
-   `attrs` **Array** Attributes to copy.

Returns **undefined** undefined

# appendChild

Appends a child node to the given parent node.

**Parameters**

-   `parentNode` **ASTNode** Parent node.
-   `newNode` **ASTNode**  Child node.

Returns **undefined** undefined

# createCommentNode

Creates a comment node.

**Parameters**

-   `data` **string** Comment text.

Returns **ASTNode&lt;CommentNode&gt;** comment

# createDocument

Creates a document node.

Returns **ASTNode&lt;Document&gt;** document

# createDocumentFragment

Creates a document fragment node.

Returns **ASTNode&lt;DocumentFragment&gt;** fragment

# createElement

Creates an element node.

**Parameters**

-   `tagName` **string** Tag name of the element.
-   `namespaceURI` **string** Namespace of the element.
-   `attrs` **Array** Attribute name-value pair array.
                            Foreign attributes may contain `namespace` and `prefix` fields as well.

Returns **ASTNode&lt;Element&gt;** element

# detachNode

Removes a node from its parent.

**Parameters**

-   `node` **ASTNode** Node.

Returns **undefined** undefined

# getAttrList

Returns the given node's attributes in an array, in the form of name-value pairs.
Foreign attributes may contain `namespace` and `prefix` fields as well.

**Parameters**

-   `node` **ASTNode** Node.

Returns **Array** attributes

# getChildNodes

Returns the given node's children in an array.

**Parameters**

-   `node` **ASTNode** Node.

Returns **Array** children

# getCommentNodeContent

Returns the given comment node's content.

**Parameters**

-   `commentNode` **ASTNode&lt;Comment&gt;** Comment node.

Returns **string** commentText

# getDocumentTypeNodeName

Returns the given document type node's name.

**Parameters**

-   `doctypeNode` **ASTNode&lt;DocumentType&gt;** Document type node.

Returns **string** name

# getDocumentTypeNodePublicId

Returns the given document type node's public identifier.

**Parameters**

-   `doctypeNode` **ASTNode&lt;DocumentType&gt;** Document type node.

Returns **string** publicId

# getDocumentTypeNodeSystemId

Returns the given document type node's system identifier.

**Parameters**

-   `doctypeNode` **ASTNode&lt;DocumentType&gt;** Document type node.

Returns **string** systemId

# getFirstChild

Returns the first child of the given node.

**Parameters**

-   `node` **ASTNode** Node.

Returns **ASTNode** firstChild

# getNamespaceURI

Returns the given element's namespace.

**Parameters**

-   `element` **ASTNode&lt;Element&gt;** Element.

Returns **string** namespaceURI

# getParentNode

Returns the given node's parent.

**Parameters**

-   `node` **ASTNode** Node.

Returns **ASTNode** parent

# getTagName

Returns the given element's tag name.

**Parameters**

-   `element` **ASTNode&lt;Element&gt;** Element.

Returns **string** tagName

# getTemplateContent

Returns the `<template>` element content element.

**Parameters**

-   `templateElement` **ASTNode&lt;TemplateElement&gt;** `<template>` element.

Returns **ASTNode&lt;DocumentFragment&gt;** fragment

# getTextNodeContent

Returns the given text node's content.

**Parameters**

-   `textNode` **ASTNode&lt;Text&gt;** Text node.

Returns **string** text

# insertBefore

Inserts a child node to the given parent node before the given reference node.

**Parameters**

-   `parentNode` **ASTNode** Parent node.
-   `newNode` **ASTNode**  Child node.
-   `referenceNode` **ASTNode**  Reference node.

Returns **undefined** undefined

# insertText

Inserts text into a node. If the last child of the node is a text node, the provided text will be appended to the
text node content. Otherwise, inserts a new text node with the given text.

**Parameters**

-   `parentNode` **ASTNode** Node to insert text into.
-   `text` **string** Text to insert.

Returns **undefined** undefined

# insertTextBefore

Inserts text into a sibling node that goes before the reference node. If this sibling node is the text node,
the provided text will be appended to the text node content. Otherwise, inserts a new sibling text node with
the given text before the reference node.

**Parameters**

-   `parentNode` **ASTNode** Node to insert text into.
-   `text` **string** Text to insert.
-   `referenceNode` **ASTNode** Node to insert text before.

Returns **undefined** undefined

# isCommentNode

Determines if the given node is a comment node.

**Parameters**

-   `node` **ASTNode** Node.

Returns **boolean** boolean

# isDocumentTypeNode

Determines if the given node is a document type node.

**Parameters**

-   `node` **ASTNode** Node.

Returns **boolean** boolean

# isElementNode

Determines if the given node is an element.

**Parameters**

-   `node` **ASTNode** Node.

Returns **boolean** boolean

# isQuirksMode

Determines if the document's quirks mode flag is set.

**Parameters**

-   `document` **ASTNode&lt;Document&gt;** Document node.

Returns **boolean** boolean

# isTextNode

Determines if the given node is a text node.

**Parameters**

-   `node` **ASTNode** Node.

Returns **boolean** boolean

# setDocumentType

Sets the document type. If the `document` already contains a document type node, the `name`, `publicId` and `systemId`
properties of this node will be updated with the provided values. Otherwise, creates a new document type node
with the given properties and inserts it into the `document`.

**Parameters**

-   `document` **ASTNode&lt;Document&gt;** Document node.
-   `name` **string**  Document type name.
-   `publicId` **string** Document type public identifier.
-   `systemId` **string** Document type system identifier.

Returns **undefined** undefined

# setQuirksMode

Sets the document's quirks mode flag.

**Parameters**

-   `document` **ASTNode&lt;Document&gt;** Document node.

Returns **undefined** undefined

# setTemplateContent

Sets the `<template>` element content element.

**Parameters**

-   `templateElement` **ASTNode&lt;TemplateElement&gt;** `<template>` element.
-   `contentElement` **ASTNode&lt;DocumentFragment&gt;**  Content element.

Returns **undefined** undefined

# compile

Runs HTML string through the impress parser to generate TreeAdapter to run all plugins enabled against it.

**Parameters**

-   `html` **string** HTML markup to parse as a string. You can either pass in the whole document or a valid fragment of HTML.
-   `data` **[Object]** Sets the initial data to prime parser with. Additional plugins like `use` can append data to this object in block scope. (optional, default `{}`)

Returns **string** HTML markup returned as a string. Any Impress commands listed as attributes should be removed.

# init

Init function to modify options, reporter, or plugins

**Parameters**

-   `opts` **[Object]** Allows options to be passed in to customize the parser. (optional, default `{}`)
-   `rep` **[any]** Reporter plugin to use with the parser.
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

# createDocument

Based on the default tree adapter provided by parse5 located at
`https://github.com/inikulin/parse5/blob/master/lib/tree_adapters/default.js | source material`

# TreeAdapter

# createManifest

Creates a manifest of all plugins to run code against.

**Parameters**

-   `plugins` **Array** Set of plugins to initiation of use as part of the parser.
-   `prefix` **string** Prefix to be added before any attribute command.

Returns **Object** manifest
