'use strict';

/**
 * Based on the default tree adapter provided by parse5 email
 * on {@link https://github.com/inikulin/parse5/blob/master/lib/tree_adapters/default.js | source material}
 */

/**
 * @typedef {Object} TreeAdapter
 */
var treeAdapter = {};

// Node Creation

/**
 * @private
 * @param  {string} value - string to be inserted as text
 * 
 * @returns {ATSNode.<TextNode>} text node
 */
var createTextNode = function (value) {
    return {
        node: '#text',
        value: value,
        parent: null
    };
};


/**
 * Creates a document node.
 * 
 * @function createDocument
 * @memberof TreeAdapter
 *
 * @returns {ASTNode.<Document>} document
 */
treeAdapter.createDocument = function () {
    return {
        node: '#document',
        quirksMode: false,
        children: []
    };
};

/**
 * Creates a document fragment node.
 * 
 * @function createDocumentFragment
 * @memberof TreeAdapter
 *
 * @returns {ASTNode.<DocumentFragment>} fragment
 */
treeAdapter.createDocumentFragment = function () {
    return {
        node: '#docuemnt-fragment',
        quirksMode: false,
        children: []
    };
};

/**
 * Creates an element node.
 * 
 * @function createElement
 * @memberof TreeAdapter
 *
 * @param {string} tagName - Tag name of the element.
 * @param {string} namespaceURI - Namespace of the element.
 * @param {Array}  attrs - Attribute name-value pair array.
 *                         Foreign attributes may contain `namespace` and `prefix` fields as well.
 *
 * @returns {ASTNode.<Element>} element
 */
treeAdapter.createElement = function (tagName, namespaceURI, attrs) {
    return {
        node: tagName,
        tag: tagName,
        attrs: attrs,
        namespaceURI: namespaceURI,
        children: [],
        parent: null
    };
};

/**
 * Creates a comment node.
 * 
 * @function createElement
 * @memberof TreeAdapter
 *
 * @param {string} value - Comment text.
 *
 * @returns {ASTNode.<CommentNode>} comment
 */
treeAdapter.createCommentNode = function (value) {
    return {
        node: '#comment',
        value: value,
        parent: null
    };
};

//Tree Mutation

/**
 * Appends a child node to the given parent node.
 * 
 * @function appendChild
 * @memberof TreeAdapter
 *
 * @param {ASTNode} parent - Parent node.
 * @param {ASTNode} node -  Child node.
 * @returns {undefined} undefined
 */
var append = function (parent, node) {
    parent.children.push(node);
    node.parent = parent;
};

treeAdapter.appendChild = append;

/**
 * Inserts a child node to the given parent node before the given reference node.
 * 
 * @function insertBefore
 * @memberof TreeAdapter
 *
 * @param {ASTNode} parent - Parent node.
 * @param {ASTNode} node -  Child node.
 * @param {ASTNode} reference -  Reference node.
 * @returns {undefined} undefined
 */
var prepend = function (parent, node, reference) {
    var index = parent.child.indexOf(reference);

    parent.children.splice(index, 0, node);
    node.parent = parent;
};

treeAdapter.insertBefore = prepend;

/**
 * Sets the <template> element content element.
 * 
 * @function setTemplateContent
 * @memberof TreeAdapter
 *
 * @param {ASTNode.<TemplateElement>} templateElement - <template> element.
 * @param {ASTNode.<DocumentFragment>} contentElement -  Content element.
 * @returns {undefined} undefined
 */
treeAdapter.setTemplateContent = function (templateElement, contentElement) {
    templateElement.content = contentElement;
};

/**
 * Returns the <template> element content element.
 * 
 * @function getTemplateContent
 * @memberof TreeAdapter
 *
 * @param {ASTNode.<DocumentFragment>} templateElement - Template element.
 * @returns {string} returns content string 
 */
treeAdapter.getTemplateContent = function (templateElement) {
    return templateElement.content;
};

/**
 * Sets the document type. If the `document` already contains a document type node, the `name`, `publicId` and `systemId`
 * properties of this node will be updated with the provided values. Otherwise, creates a new document type node
 * with the given properties and inserts it into the `document`.
 * 
 * @function setDocumentType
 * @memberof TreeAdapter
 * 
 * @param {ASTNode.<Document>} document - Document node.
 * @param {string} name -  Document type name.
 * @param {string} publicId - Document type public identifier.
 * @param {string} systemId - Document type system identifier.
 * @returns {undefined} undefined
  */
treeAdapter.setDocumentType = function (document, name, publicId, systemId) {
    var doctypeNode = null,
        i = 0;

    for (i; i < document.children.length; i++) {
        if (document.children[i].node === '#documentType') {
            doctypeNode = document.children[i];
            break;
        }
    }

    if (doctypeNode) {
        doctypeNode.name = name;
        doctypeNode.publicId = publicId;
        doctypeNode.systemId = systemId;
    } else {
        var node = {
            node: '#documentType',
            name: name,
            publicId: publicId,
            systemId: systemId
        };

        append(document, node);
    }
};

/**
 * Sets the document's quirks mode flag.
 * 
 * @function setQuirksMode
 * @memberof TreeAdapter
 *
 * @param {ASTNode.<Document>} document - Document node.
 * @returns {undefined} undefined
 */
treeAdapter.setQuirksMode = function (document) {
    document.quirksMode = true;
};

/**
 * Determines if the document's quirks mode flag is set.
 * 
 * @function setQuirksMode
 * @memberof TreeAdapter
 *
 * @param {ASTNode.<Document>} document - Document node.
 * @returns {boolean} true if quirksMode is enabled
*/
treeAdapter.isQuirksMode = function (document) {
    return document.quirksMode;
};

/**
 * Removes a node from its parent.
 * 
 * @function detachNode
 * @memberof TreeAdapter
 *
 * @param {ASTNode} node - Node.
 * @returns {undefined} undefined
*/
treeAdapter.detachNode = function (node) {
    if (node.parentNode) {
        var index = node.parent.children.indexOf(node);

        node.parent.children.splice(index, 1);
        node.parent = null;
    }
};

/**
 * Inserts text into a node. If the last child of the node is a text node, the provided text will be appended to the
 * text node content. Otherwise, inserts a new text node with the given text.
 * 
 * @function insertText
 * @memberof TreeAdapter
 *
 * @param {ASTNode} parent - Node to insert text into.
 * @param {string} text - Text to insert.
 * @returns {undefined} undefined
 */
treeAdapter.insertText = function (parent, text) {
    if (parent.children.length) {
        var previous = parent.children[parent.children.length - 1];

        if (previous.node === '#text') {
            previous.value += text;
            return;
        }
    }

    append(parent, createTextNode(text));
};

/**
 * Inserts text into a sibling node that goes before the reference node. If this sibling node is the text node,
 * the provided text will be appended to the text node content. Otherwise, inserts a new sibling text node with
 * the given text before the reference node.
 * 
 * @function insertTextBefore
 * @memberof TreeAdapter
 *
 * @param {ASTNode} parent - Node to insert text into.
 * @param {string} text - Text to insert.
 * @param {ASTNode} reference - Node to insert text before.
 * @returns {undefined} undefined
 */
treeAdapter.insertTextBefore = function (parent, text, reference) {
    var previous = parent.children[parent.children.indexOf(reference) - 1];

    if (previous && previous.node === '#text') {
        previous.value += text;
    } else {
        prepend(parent, createTextNode(text), reference);
    }
};

/**
 * Copies attributes to the given node. Only attributes that are not yet present in the node are copied.
 * 
 * @function adoptAttributes
 * @memberof TreeAdapter
 *
 * @param {ASTNode} recipient - Node to copy attributes into.
 * @param {Array} attrs - Attributes to copy.
 * @returns {undefined} undefined
*/
treeAdapter.adoptAttributes = function (recipient, attrs) {
    var attrsMap = [],
        i = 0,
        j = 0;

    for (i; i < recipient.attrs.length; i++) {
        attrsMap.push(recipient.attrs[i].name);
    }

    for (j; j < attrs.length; j++) {
        if (attrsMap.indexOf(attrs[j].name) === -1) {
            recipient.attrs.push(attrs[j]);
        }
    }
};

//Tree Traversing

/**
 * Returns the first child of the given node.
 * 
 * @function getFirstChild
 * @memberof TreeAdapter
 *
 * @param {ASTNode} node - Node.
 *
 * @returns {ASTNode} firstChild
 */
treeAdapter.getFirstChild = function (node) {
    return node.children[0];
};

/**
 * Returns the given node's children in an array.
 * 
 * @function getChildNodes
 * @memberof TreeAdapter
 *
 * @param {ASTNode} node - Node.
 *
 * @returns {Array} children
 */
treeAdapter.getChildNodes = function (node) {
    return node.children;
};

/**
 * Returns the given node's parent.
 * 
 * @function getParentNode
 * @memberof TreeAdapter
 *
 * @param {ASTNode} node - Node.
 *
 * @returns {ASTNode} parent
 */
treeAdapter.getParentNode = function (node) {
    return node.parent;
};

/**
 * Returns the given node's attributes in an array, in the form of name-value pairs.
 * Foreign attributes may contain `namespace` and `prefix` fields as well.
 * 
 * @function getAttrList
 * @memberof TreeAdapter
 *
 * @param {ASTNode} node - Node.
 *
 * @returns {Array} attributes
  */
treeAdapter.getAttrList = function (node) {
    return node.attrs;
};

//Node Data

/**
 * Returns the given element's tag name.
 * 
 * @function getTagName
 * @memberof TreeAdapter
 *
 * @param {ASTNode.<Element>} element - Element.
 *
 * @returns {string} tagName
  */
treeAdapter.getTagName = function (element) {
    return element.tag;
};

/**
 * Returns the given element's namespace.
 * 
 * @function getNamespaceURI
 * @memberof TreeAdapter
 *
 * @param {ASTNode.<Element>} element - Element.
 *
 * @returns {string} namespaceURI
 */
treeAdapter.getNamespaceURI = function (element) {
    return element.namespaceURI;
};

/**
 * Returns the given text node's content.
 * 
 * @function getTextNodeContent
 * @memberof TreeAdapter
 *
 * @param {ASTNode.<Text>} textNode - Text node.
 *
 * @returns {string} text
 */
treeAdapter.getTextNodeContent = function (textNode) {
    return textNode.value;
};

/**
 * Returns the given comment node's content.
 * 
 * @function getTextNodeContent
 * @memberof TreeAdapter
 *
 * @param {ASTNode.<Comment>} commentNode - Comment node.
 *
 * @returns {string} commentText
 *
 * @see {@link https://github.com/inikulin/parse5/blob/tree-adapter-docs-rev/lib/tree_adapters/default.js#L412|default implementation.}
 */
treeAdapter.getCommentNodeContent = function (commentNode) {
    return commentNode.value;
};

/**
 * Returns the given document type node's name.
 * 
 * @function getDocumentTypeNodeName
 * @memberof TreeAdapter
 *
 * @param {ASTNode<DocumentType>} doctypeNode - Document type node.
 *
 * @returns {string} name
  */
treeAdapter.getDocumentTypeNodeName = function (doctypeNode) {
    return doctypeNode.name;
};

/**
 * Returns the given document type node's public identifier.
 * 
 * @function getDocumentTypeNodePublicId
 * @memberof TreeAdapter
 *
 * @param {ASTNode.<DocumentType>} doctypeNode - Document type node.
 *
 * @returns {string} publicId
 */
treeAdapter.getDocumentTypeNodePublicId = function (doctypeNode) {
    return doctypeNode.publicId;
};

/**
 * Returns the given document type node's system identifier.
 * 
 * @function getDocumentTypeNodeSystemId
 * @memberof TreeAdapter
 *
 * @param {ASTNode.<DocumentType>} doctypeNode - Document type node.
 *
 * @returns {string} systemId
 */
treeAdapter.getDocumentTypeNodeSystemId = function (doctypeNode) {
    return doctypeNode.systemId;
};

//Node types
/**
 * Determines if the given node is a text node.
 * 
 * @function isTextNode
 * @memberof TreeAdapter
 *
 * @param {ASTNode} node - Node.
 *
 * @returns {boolean} true is text node
*/
treeAdapter.isTextNode = function (node) {
    return node.node === '#text';
};

/**
 * Determines if the given node is a comment node.
 * 
 * @function isCommentNode
 * @memberof TreeAdapter
 *
 * @param {ASTNode} node - Node.
 *
 * @returns {boolean} true if is comment node
*/
treeAdapter.isCommentNode = function (node) {
    return node.node === '#comment';
};

/**
 * Determines if the given node is a document type node.
 * 
 * @function isDocumentTypeNode
 * @memberof TreeAdapter
 *
 * @param {ASTNode} node - Node.
 *
 * @returns {boolean} true if is document type node
*/
treeAdapter.isDocumentTypeNode = function (node) {
    return node.node === '#documentType';
};

/**
 * Determines if the given node is an element.
 * 
 * @function isElementNode
 * @memberof TreeAdapter
 *
 * @param {ASTNode} node - Node.
 *
 * @returns {boolean} true if has tag attribute
 */
treeAdapter.isElementNode = function (node) {
    return !!node.tag;
};

// Exports
module.exports = treeAdapter;

