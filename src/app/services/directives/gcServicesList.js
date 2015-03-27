define(['../services.module'], function (module) {

    'use strict';

    module.registerDirective('gcServicesList', gcServicesList);

    function gcServicesList($location) {

        console.log('Creating gcServicesList directive.');

        var directive = {
            link: link,
            //compile: compile,
            restrict: 'E',
            replace: true,
            scope: {
                services: '=',
                patientId: '=',
                qualificationId: '='
            },
            templateUrl: 'app/services/directives/templates/gcServicesList.html'
        };

        function link(scope, element, attrs) {
            scope.showSelectPatient = !scope.patientId;
            scope.openProgram = function (programPath, patient) {
                var patientQualificationId = scope.qualificationId || '';
                var patientId = patient ? patient.patientId : scope.patientId; 
                if (patientId) {
                    var path = '/patient/' + patientId + '/' + programPath + '/new/' + patientQualificationId;
                    console.log('Navigate:' + path);
                    $location.path(path);
                }
                
            }
        };


        return directive;
    }

});