define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-resource',
    'angular-sanitize'
    
], function (ng, couchPotato) {
    'use strict';

    var module = ng.module('app.inhalerTechnique', [
        'ui.router',
        'ngResource',
        'ngSanitize',
        'app.programs.common',
        'app.programs.common.filters'
    ]);

    module.config(function ($stateProvider, $couchPotatoProvider) {
        $stateProvider
            .state('app.inhalerTechnique', {
                url: '/patient/:patientId/inhalerTechnique/:documentId/{patientQualificationId:.*}',
                views: {
                    "content@app": {
                        controller: 'InhalerTechniqueController',
                        templateUrl: 'app/programs/inhalerTechnique/inhalerTechnique.html',
                        resolve: {
                            deps: $couchPotatoProvider.resolveDependencies([
                                //Controller
                                'programs/inhalerTechnique/inhalerTechnique.controller',
                                //Inhaler Technique directives
                                'programs/inhalerTechnique/directives/gcTechniqueCheck',
                                'programs/inhalerTechnique/directives/gcTechniqueCheckRow',
                                'programs/inhalerTechnique/directives/gcAsthmaMedications',
                                'programs/inhalerTechnique/directives/gcInhalerType',
                                'programs/inhalerTechnique/directives/gcAsthmaRecommendations',
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
                                'programs/common/directives/showValidation',
                                'programs/common/directives/gcPharmacistRecommendations',
                                //Filters
                                'programs/common/filters/genderFilter',
                                'programs/common/filters/genderIconFilter'
                            ])
                        }
                    }
                },
                data:{
                    title: 'Inhaler Technique'
                }
            });
    });

    couchPotato.configureApp(module);

    module.run(function($couchPotato){
        module.lazy = $couchPotato;
    });

    return module;
});