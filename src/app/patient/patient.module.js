define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-resource'
], function (ng, couchPotato) {
    'use strict';

    var module = ng.module('app.patient', [
        'ui.router',
        'ngResource',
        'app.programs.common.filters'
    ]);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider
            .state('app.patient', {
                url: '/patient/:id/:lastName',
                views: {
                    "content@app": {
                        controller: 'PatientController',
                        templateUrl: 'app/patient/patient.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'patient/patient.controller',
                                'patient/patient.edit.controller',
                                'patient/directives/gcPatientMedications',
                                'patient/directives/gcTimeLine',
                                'patient/directives/gcSendMessage',
                                
                                //Filters
                                'programs/common/filters/genderFilter',
                                'programs/common/filters/genderIconFilter',
                                'programs/common/filters/qualiciationStatusFilter',
                                'programs/common/directives/gcDatepicker',
                                'programs/common/directives/gcPatientDetailsForm',
                                'services/directives/gcServicesList'

                            ])
                        }
                    }
                },
                data:{
                    title: 'Patient'
                }
            })
            .state('app.patients', {
                url: '/patients',
                views: {
                    "content@app": {
                        controller: 'PatientListController',
                        templateUrl: 'app/patient/patient.list.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                'patient/patient.list.controller',
                                'patient/directives/gcAddPatient',
                                'programs/common/directives/gcProgramButton',
                                'programs/common/filters/qualiciationStatusFilter',
                                'modules/forms/directives/input/smartSelect2'                                
                            ])
                        }
                    }
                },
                data:{
                    title: 'Patients list'
                }
            });

    });

    couchPotato.configureApp(module);

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});