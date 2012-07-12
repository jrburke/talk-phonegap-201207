
/*global define, console, document, navigator */

define(function (require) {
    'use strict';

    var $ = require('jquery'),
        cordova = require('env!cordova');

    $(function () {
        document.addEventListener("deviceready", function () {
            navigator.notification.alert("Cordova is working");
        }, false);
    });
});