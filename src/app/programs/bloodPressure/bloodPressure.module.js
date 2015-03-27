define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-resource'
], function (ng, couchPotato) {
    'use strict';

    var module = ng.module('app.bloodPressure', [
        'ui.router',
        'ngResource',
        'app.programs.common',
        'app.programs.common.filters'
    ]);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider
            .state('app.bloodPressure', {
                url: '/patient/:patientId/bloodPressure/:documentId/{patientQualificationId:.*}',
                views: {
                    "content@app": {
                        controller: 'BloodPressureController',
                        templateUrl: 'app/programs/bloodPressure/bloodPressure.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                //Controller
                                'programs/bloodPressure/bloodPressure.controller',
                                //Blood Pressure directives
                                'programs/bloodPressure/directives/gcBloodPressure',
                                'programs/bloodPressure/directives/gcBloodPressureAssessment',
                                'programs/bloodPressure/directives/gcBloodPressureMeasurements',
                                'programs/bloodPressure/directives/gcBPProgress',
                                'programs/bloodPressure/directives/gcBloodPressureActions',
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
                                'programs/common/directives/gcPrintButton',

                                //Reporting
                                'reports/directives/gcTelerikReportViewerModal',

                                //Filters
                                'programs/common/filters/genderFilter',
                                'programs/common/filters/genderIconFilter'
                            ])
                        }
                    }
                },
                data:{
                    title: 'Blood Pressure'
                }
            });
    });

    couchPotato.configureApp(module);

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});