'use strict';

/**
 * @ngdoc overview
 * @name app [smartadminApp]
 * @description
 * # app [smartadminApp]
 *
 * Main module of the application.
 */

define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-animate',
    'angular-bootstrap',
    'angular-sanitize',
    'angular-ui-select',
    'angular-ui-utils',
    'smartwidgets',
    'notification',
    'json2xml',
    'ng-tags-input',
    'angular-moment'

], function (ng, couchPotato) {

    var app = ng.module('app', [
        'ngSanitize',
        'ngTagsInput',
        'scs.couch-potato',
        'ngAnimate',
        'angularMoment',
        'ui.router',
        'ui.bootstrap',
        'ui.select',
        'ui.utils',
        'kendo.directives',
        // App
        'app.core',
        'app.auth',
        'app.layout',
        'app.dashboard',
        'app.bloodPressure',
        'app.bloodGlucose',
        'app.inhalerTechnique',
        'app.daa',
        'app.calendar',
        'app.inbox',
        'app.widgets',
        'app.patient',
        'app.forms',
        'app.reports',
        'app.services'
    ]);

    couchPotato.configureApp(app);

    app.config(function ($provide, $httpProvider, $locationProvider) {



        // Intercept http calls.
        $provide.factory('ErrorHttpInterceptor', function ($q) {
            var errorCounter = 0;
            function notifyError(rejection){
                console.log(rejection);
                $.bigBox({
                    title: rejection.status + ' ' + rejection.statusText,
                    content: rejection.data,
                    color: "#C46A69",
                    icon: "fa fa-warning shake animated",
                    number: ++errorCounter,
                    timeout: 6000
                });
            }

            return {
                // On request failure
                requestError: function (rejection) {
                    // show notification
                    notifyError(rejection);

                    // Return the promise rejection.
                    return $q.reject(rejection);
                },

                // On response failure
                responseError: function (rejection) {
                    // show notification
                    notifyError(rejection);
                    // Return the promise rejection.
                    return $q.reject(rejection);
                }
            };
        });

        // Add the interceptor to the $httpProvider.
        $httpProvider.interceptors.push('ErrorHttpInterceptor');

        //$locationProvider.hashPrefix('!');
        // use the HTML5 History API
        //$locationProvider.html5Mode(true);

    });

    app.constant('angularMomentConfig', {
        preprocess: 'utc'
    });

    app.run(function ($couchPotato, $rootScope, $state, $stateParams, $modalStack) {
        app.lazy = $couchPotato;
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        // editableOptions.theme = 'bs3';
        $rootScope.$on('$stateChangeSuccess', function (newVal, oldVal) {
             if (oldVal !== newVal) { $modalStack.dismissAll(); }
        });

    });

   
    return app;
});
