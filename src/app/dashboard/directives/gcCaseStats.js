define(['../dashboard.module'], function (module) {

    'use strict';

    module.registerDirective('gcCaseStats', gcCaseStats);

    function gcCaseStats() {

        console.log('Creating gcCaseStats directive.');

        var directive = {
            link: link,
            //compile: compile,
            restrict: 'E',
            replace: true,
            scope: {
                statistics: '='
            },
            templateUrl: 'app/dashboard/directives/templates/gcCaseStats.html'
        };

        function link(scope, element, attrs) {
        };


        return directive;
    }

});