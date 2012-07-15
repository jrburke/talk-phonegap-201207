/*jslint browser: true */
/*global define */

/**
 * Reloads the webview used in a cordova app, based on the original
 * URL that was loaded, but passes a cache busting arg that can be used
 * in the requirejs config.
 */

define(function (require) {
    'use strict';

    var reloadId,
        bustRegExp = /cacheBust=\d+/,
        href = location.href.replace(bustRegExp, '');

    function clear() {
        if (reloadId) {
            clearTimeout(reloadId);
            reloadId = 0;
        }
    }

    document.addEventListener("touchstart", function (evt) {
        if (!reloadId) {
            reloadId = setTimeout(function () {
                if (window.confirm('Dev reload?\n' + href)) {
                    location.replace(href +
                                     (href.indexOf('?') === -1 ? '?' : '') +
                                     'cacheBust=' + (new Date()).getTime());
                }
                reloadId = 0;
            }, 1337);
        }
    }, false);

    document.addEventListener("touchend", clear, false);
    document.addEventListener("touchmove", clear, false);
});