define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-resource'
], function (ng, couchPotato) {
    'use strict';

    var module = ng.module('app.daa', [
        'ui.router',
        'ngResource',
        'app.programs.common',
        'app.programs.common.filters'
    ]);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider
            .state('app.daa', {
                url: '/patient/:patientId/weeklyMedicines/:documentId/{patientQualificationId:.*}',
                views: {
                    "content@app": {
                        controller: 'DaaController',
                        templateUrl: 'app/programs/daa/daa.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                //Controller
                                'programs/daa/daa.controller',
                                //Common program
                                'programs/common/programs.common.factory',
                                
                                //Custom directives
                                'programs/common/directives/gcPatientDetailsForm',
                                'programs/common/directives/gcPatientDetails',
                                'programs/common/directives/gcFollowUpOptions',
                                'programs/common/directives/gcHorizontalGauge',
                                'programs/common/directives/gcCaseStatus',
                                'programs/common/directives/gcCaseActions',
                                'programs/common/directives/gcLineChart',
                                
                                'programs/common/directives/gcProgramHeader',
                                'programs/common/directives/gcPharmacistRecommendations',
                                'programs/common/directives/multiSelect',
                                'programs/common/directives/gcDatepicker',
                                'programs/common/directives/showValidation',

                                //Filters
                                'programs/common/filters/genderFilter',
                                'programs/common/filters/genderIconFilter'
                            ])
                        }
                    }
                },
                data:{
                    title: 'Weekly Medicines'
                }
            });
    });

    couchPotato.configureApp(module);

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});