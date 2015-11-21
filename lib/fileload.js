'use strict';

// Load modules

const parse = require('parse5').parser();
const utils = require('parse5-utils')

// Declare internals

const internals = {};

exports = module.exports = internals.Processor = function (options) {

/*
    Hoek.assert(this instanceof internals.Server, 'Server must be instantiated using new');

    options = Schema.apply('server', options || {});

    this._settings = Hoek.applyToDefaultsWithShallow(Defaults.server, options, ['connections.routes.bind']);
    this._settings.connections = Hoek.applyToDefaultsWithShallow(Defaults.connection, this._settings.connections || {}, ['routes.bind']);
    this._settings.connections.routes.cors = Hoek.applyToDefaults(Defaults.cors, this._settings.connections.routes.cors);
    this._settings.connections.routes.security = Hoek.applyToDefaults(Defaults.security, this._settings.connections.routes.security);

    this._caches = {};                                                  // Cache clients
    this._handlers = {};                                                // Registered handlers
    this._methods = new Methods(this);                                  // Server methods

    this._events = new Events.EventEmitter();                           // Server-only events
    this._dependencies = [];                                            // Plugin dependencies
    this._registrations = {};                                           // Tracks plugins registered before connection added
    this._heavy = new Heavy(this._settings.load);
    this._mime = new Mimos(this._settings.mime);
    this._replier = new Reply();
    this._requestor = new Request();
    this._decorations = {};
    this._plugins = {};                                                 // Exposed plugin properties by name
    this._app = {};
    this._registring = false;                                           // true while register() is waiting for plugin callbacks
    this._state = 'stopped';                                            // 'stopped', 'initializing', 'initialized', 'starting', 'started', 'stopping', 'invalid'

    this._extensionsSeq = 0;                                            // Used to keep absolute order of extensions based on the order added across locations
    this._extensions = {
        onPreStart: new Ext(this),
        onPostStart: new Ext(this),
        onPreStop: new Ext(this),
        onPostStop: new Ext(this)
    };

    if (options.cache) {
        const caches = [].concat(options.cache);
        for (let i = 0; i < caches.length; ++i) {
            this._createCache(caches[i]);
        }
    }

    if (!this._caches._default) {
        this._createCache({ engine: CatboxMemory });                    // Defaults to memory-based
    }

    Plugin.call(this, this, [], '', null);
    
*/
};

internals.Processor.prototype._load = function (file) {


    const name = options.name || '_default';

    let client = null;
    if (typeof options.engine === 'object') {
        client = new Catbox.Client(options.engine);
    }
    else {
        const settings = Hoek.clone(options);
        settings.partition = settings.partition || 'hapi-cache';
        delete settings.name;
        delete settings.engine;
        delete settings.shared;

        client = new Catbox.Client(options.engine, settings);
    }

    this._caches[name] = {
        client: client,
        segments: {},
        shared: options.shared || false
    };
};

internals.Server.prototype.connection = function (options) {

    const root = this.root;                                   // Explicitly use the root reference (for plugin invocation)

    let settings = Hoek.applyToDefaultsWithShallow(root._settings.connections, options || {}, ['listener', 'routes.bind']);
    settings.routes.cors = Hoek.applyToDefaults(root._settings.connections.routes.cors || Defaults.cors, settings.routes.cors) || false;
    settings.routes.security = Hoek.applyToDefaults(root._settings.connections.routes.security || Defaults.security, settings.routes.security);

    settings = Schema.apply('connection', settings);       // Applies validation changes (type cast)

    const connection = new Connection(root, settings);
    root.connections.push(connection);
    root.addEmitter(connection);
    root._single();

    const registrations = Object.keys(root._registrations);
    for (let i = 0; i < registrations.length; ++i) {
        const name = registrations[i];
        connection.registrations[name] = root._registrations[name];
    }

    return this._clone([connection]);                       // Use this for active realm
};


