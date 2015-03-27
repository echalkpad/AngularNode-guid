define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-resource'
], function (ng, couchPotato) {
    'use strict';

    var module = ng.module('app.dashboard', [
        'ui.router',
        'ngResource'
    ]);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider
            .state('app.dashboard', {
                url: '/dashboard',
                views: {
                    "content@app": {
                        controller: 'DashboardController',
                        templateUrl: 'app/dashboard/dashboard.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'dashboard/dashboard.controller',
                                'dashboard/directives/gcSubscription',
                                'dashboard/directives/gcProgramResources',
                                'dashboard/directives/gcOpportunities',
                                'dashboard/directives/gcNews',
                                'dashboard/directives/gcDashboardCalendar',
                                'dashboard/directives/gcCaseStats'

                            ])
                        }
                    }
                },
                data:{
                    title: 'Dashboard'
                }
            });
    });

    couchPotato.configureApp(module);

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});