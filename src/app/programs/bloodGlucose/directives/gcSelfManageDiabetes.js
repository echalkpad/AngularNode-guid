define(['../bloodGlucose.module'], function (module) {

    'use strict';

    module.registerDirective('gcSelfManageDiabetes', gcSelfManageDiabetes);

    function gcSelfManageDiabetes() {

        console.log('Creating gcSelfManageDiabetes directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                bglAttributes: '=',
                name: '@'
            },
            templateUrl: 'app/programs/bloodGlucose/directives/templates/gcSelfManageDiabetes.html'
        };

        function link(scope, element, attrs) {

            scope.testFrequencyList = ['5 or more times a day',
                    '3 to 4 times a day',
                    '1 to 2 times a day',
                    'A few times a week',
                    'Once a week or less',
                    'Other'];


        };

        return directive;
    }

});