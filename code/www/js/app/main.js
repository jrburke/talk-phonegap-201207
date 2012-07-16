
/*global define, console, document, navigator, location */

define(function (require) {
    'use strict';

    var $ = require('jquery');

    //Dependencies that do not have a module value
    require('cordovaReload');

    $(function () {
        document.addEventListener("deviceready", function () {
            navigator.notification.alert("Cordova is working: " + location.href);
        }, false);
    });
});
