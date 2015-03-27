define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-resource'
], function (ng, couchPotato) {
    'use strict';

    var module = ng.module('app.reports', [
        'ui.router',
        'ngResource'
    ]);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider
            .state('app.reports', {
                url: '/reports',
                views: {
                    "content@app": {
                        controller: 'ReportsController',
                        templateUrl: 'app/reports/reports.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'reports/reports.controller',

                                //Custom directives
                                'reports/directives/gcPrintReportButton',
                                'reports/directives/gcTelerikReportViewerModal',
                                'reports/directives/gcReportsList'
                            ])
                        }
                    }
                },
                data:{
                    title: 'Reports'
                }
            });
    });

    couchPotato.configureApp(module);

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});