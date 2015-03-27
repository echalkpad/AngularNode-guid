define(['../bloodPressure.module'], function (module) {

    'use strict';

    module.registerDirective('gcBloodPressureAssessment', gcBloodPressureAssessment);

    function gcBloodPressureAssessment() {

        console.log('Creating gcBloodPressureAssessment directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                systolicAverage: '=',
                diastolicAverage: '='
            },
            templateUrl: 'app/programs/bloodPressure/directives/templates/gcBloodPressureAssessment.html'
        };

        function link(scope, element, attrs) {
            
            scope.$watch('systolicAverage', function () {
                scope.IsSystolicNormal = (scope.systolicAverage < 120);
                scope.IsSystolicHighNormal = (scope.systolicAverage >= 120 && scope.systolicAverage <= 139);
                scope.IsSystolicMildHypertension = (scope.systolicAverage >= 140 && scope.systolicAverage <= 159);
                scope.IsSystolicModerateHypertension = (scope.systolicAverage >= 160 && scope.systolicAverage <= 179);
                scope.IsSystolicSevereHypertension = (scope.systolicAverage > 180);

            });

            scope.$watch('diastolicAverage', function () {
                scope.IsDiastolicNormal = (scope.diastolicAverage < 80);
                scope.IsDiastolicHighNormal = (scope.diastolicAverage >= 80 && scope.diastolicAverage <= 89);
                scope.IsDiastolicMildHypertension = (scope.diastolicAverage >= 90 && scope.diastolicAverage <= 99);
                scope.IsDiastolicModerateHypertension = (scope.diastolicAverage >= 100 && scope.diastolicAverage <= 109);
                scope.IsDiastolicSevereHypertension = (scope.diastolicAverage >= 110);
            });

        };

        return directive;
    }

});