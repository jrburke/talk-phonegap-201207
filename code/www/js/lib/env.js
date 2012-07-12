/**
 * @license Copyright (c) 2010-2012, The Dojo Foundation All Rights Reserved.
 * Available via the MIT or new BSD license.
 */

/*jslint */
/*global location, navigator, document, define */

/**
 * A plugin that modifies any /env/ path to be the right path based on
 * the host environment. Right now only works for Node, Rhino and browser.
 */
define(function () {
    'use strict';

    var pathRegExp = /(\/|^)env\/|\{env\}/,
        value = 'web',
        ua = typeof navigator !== 'undefined' && navigator.userAgent;

    if (typeof location !== 'undefined' && location.protocol === 'file:') {
        //A device installation. Nothing says quality like UA sniffing.
        //If you know of a better way to do this, speak up.
        if (/iphone/i.test(ua)) {
            value = 'ios';
        } else if (/android/i.test(ua)) {
            value = 'android';
        }
    }

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