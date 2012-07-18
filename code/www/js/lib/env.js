/**
 * @license Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 */

/*jslint */
/*global location, navigator, document, define, phonegapEnv */

/**
 * A plugin that modifies any /env/ path to be the right path based on
 * the host environment. Right now only works for Node, Rhino and browser.
 */
define(function (require, exports, module) {
    'use strict';

    var pathRegExp = /(\/|^)env\/|\{env\}/,
        value = module.config().env ||
            (typeof phonegapEnv !== 'undefined' && phonegapEnv) ||
            'web';

    function env() {
        return value;
    }

    env.load = function (name, req, load, config) {
        if (config.isBuild) {
            load();
            return;
        }

        //Allow override in the config.
        if (config.env) {
            value = config.env;
        }

        if (pathRegExp.test(name)) {
            name = name.replace(pathRegExp, function (match, prefix) {
                if (match.indexOf('{') === -1) {
                    return prefix + value + '/';
                } else {
                    return value;
                }
            });
        } else {
            name = value + '/' + name;
        }

        req([name], function (mod) {
            load(mod);
        });
    };

    return env;
});