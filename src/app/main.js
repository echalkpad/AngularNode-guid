// Defer AngularJS bootstrap
window.name = "NG_DEFER_BOOTSTRAP!";

define([
    'require',
    'jquery',
    'angular',
    'domReady',
    'xml2json',
    'xmlToJSON2',
    'kendo',
    //'pace',
    'bootstrap',
    'app',
    'includes'
], function (require, $, ng, domReady, pace) {
    'use strict';

    //pace.start({
    //    restartOnRequestAfter: true
    //});

    domReady(function (document) {
        ng.bootstrap(document, ['app']);
        ng.resumeBootstrap();
    });
});
