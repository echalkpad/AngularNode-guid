define(['../dashboard.module'], function (module) {

    'use strict';

    module.registerDirective('gcProgramResources', gcProgramResources);

    function gcProgramResources() {

        console.log('Creating gcProgramResources directive.');

        var directive = {
            link: link,
            //compile: compile,
            restrict: 'E',
            replace: true,
            scope: {
                //subscription: '='
            },
            templateUrl: 'app/dashboard/directives/templates/gcProgramResources.html'
        };

        function link(scope, element, attrs) {
            
        };
       

        return directive;
    }

});