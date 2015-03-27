define(['../bloodPressure.module'], function (module) {

    'use strict';

    module.registerDirective('gcBloodPressureActions', gcBloodPressureActions);

    function gcBloodPressureActions() {

        console.log('Creating gcBloodPressureActions directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                actions: '=',
                name: '@'
            },
            templateUrl: 'app/programs/bloodPressure/directives/templates/gcBloodPressureActions.html'
        };

        function link(scope, element, attrs) {
            scope.actions = _.sortBy(scope.actions, '@RecordDate');

            scope.remove = function() {
                var item = this.action,
                    index = scope.actions.indexOf(item);

                scope.actions.splice(index, 1);
            }

        };

        return directive;
    }

});