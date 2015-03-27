define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-resource'
], function (ng, couchPotato) {
    'use strict';

    var module = ng.module('app.bloodGlucose', [
        'ui.router',
        'ngResource',
        'app.programs.common',
        'app.programs.common.filters',
        
    ]); 'use strict';

    module.config(function ($stateProvider, $couchPotatoProvider) {

        $stateProvider
            .state('app.bloodGlucose', {
                url: '/patient/:patientId/bloodGlucose/:documentId/{patientQualificationId:.*}',
                views: {
                    "content@app": {
                        controller: 'BloodGlucoseController',
                        templateUrl: 'app/programs/bloodGlucose/bloodGlucose.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                    //Controller
                                    'programs/bloodGlucose/bloodGlucose.controller',
                                    //bloodGlucose
                                    'programs/bloodGlucose/directives/gcBglMeasurements',
                                    'programs/bloodGlucose/directives/gcBglPatientProfile',
                                    'programs/bloodGlucose/directives/gcSelfManageDiabetes',
                                    'programs/bloodGlucose/directives/gcBglProgress',
                                    'programs/bloodGlucose/directives/gcBglGauge',
                                    'programs/bloodGlucose/directives/gcHba1cMeasurements',
                                    //Common program
                                    'programs/common/programs.common.factory',

                                    //Custom directives
                                    'programs/common/directives/gcPatientDetailsForm',
                                    'programs/common/directives/gcPatientDetails',
                                    'programs/common/directives/gcFollowUpOptions',
                                    'programs/common/directives/gcHorizontalGauge',
                                    'programs/common/directives/gcCaseStatus',
                                    'programs/common/directives/gcCaseActions',
                                    'programs/common/directives/gcProgramHeader',
                                    'programs/common/directives/gcPharmacistRecommendations',
                                    'programs/common/directives/multiSelect',
                                    'programs/common/directives/gcDatepicker',
                                    'programs/common/directives/gcLineChart',
                                    'programs/common/directives/showValidation',

                                    //Filters
                                    'programs/common/filters/genderFilter',
                                    'programs/common/filters/genderIconFilter'
                            ])
                        }
                    }
                },
                data: {
                    title: 'Blood Glucose'
                }
            });

    });

    couchPotato.configureApp(module);

    module.run(function ($couchPotato) {
        module.lazy = $couchPotato;
    });

    return module;
});