define(['../inhalerTechnique.module'], function (module) {

    'use strict';

    module.registerDirective('gcAsthmaMedications', gcAsthmaMedications);

    function gcAsthmaMedications() {

        console.log('Creating gcAsthmaMedications directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                medications: '=',
                name: '@'
            },
            templateUrl: 'app/programs/inhalerTechnique/directives/templates/gcAsthmaMedications.html'
        };

        function link(scope, element, attrs) {
            scope.IsNewRecordsEnabled = false;

            function clearData() {
                scope.newPrescriber = '';
                scope.newMedication = '';
                scope.newDirections = '';
            }

            scope.cancel = function () {
                scope.IsNewRecordsEnabled = false;
                clearData();
            };

            scope.add = function () {
                scope.IsNewRecordsEnabled = true;
                clearData();
            };

            // listen for the event in the relevant $scope
            scope.$on('saveAsthmaMedications', function (event, data) {
                if (scope.IsNewRecordsEnabled && scope[scope.name].$valid) {
                    scope.save();
                }
            });

            scope.save = function () {
                scope.IsNewRecordsEnabled = false;
                var medication = {
                    '@Selected': 'true',
                    '@Directions': scope.newDirections,
                    '@PrescriberGivenName': scope.newPrescriber,
                    '@FullDrugName': scope.newMedication
                };

                scope.medications.push(medication);
                clearData();
            };

        };

        return directive;
    }

});