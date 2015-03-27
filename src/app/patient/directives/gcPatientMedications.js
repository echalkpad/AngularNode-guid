define(['../patient.module'], function (module) {

    'use strict';

    module.registerDirective('gcPatientMedications', gcPatientMedications);

    function gcPatientMedications() {

        console.log('Creating gcPatientMedications directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                scripts: '='
            },
            templateUrl: 'app/patient/directives/templates/gcPatientMedications.html'
        };

        function link(scope, element, attrs) {

            

        };

        return directive;
    }
});