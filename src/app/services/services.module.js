define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-resource'
], function (ng, couchPotato) {
    'use strict';

    var module = ng.module('app.services', [
        'ui.router',
        'ngResource'
    ]);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider
            .state('app.services', {
                url: '/services',
                views: {
                    "content@app": {
                        controller: 'ServicesController',
                        templateUrl: 'app/services/services.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'services/services.controller',
                                'services/directives/gcServicesList',
                                'patient/directives/gcSelectPatient',
                                'dashboard/directives/gcProgramResources'
                            ])
                        }
                    }
                },
                data:{
                    title: 'Services'
                }
            });
    });

    couchPotato.configureApp(module);

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});