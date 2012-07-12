/*global define, navigator, alert */

//Just a shim for some things set up by cordova, so the code can run in a
//web browser.
define(['jquery'], function ($) {
    'use strict';

    //document.addEventListener("deviceready"...

    if (!navigator.notification || !navigator.notification.alert) {
        navigator.notification = {
            alert: alert
        };
    }

});