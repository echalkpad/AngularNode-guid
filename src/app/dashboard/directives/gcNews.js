define(['../dashboard.module'], function (module) {

    'use strict';

    module.registerDirective('gcNews', gcNews);

    function gcNews() {

        console.log('Creating gcNews directive.');

        var directive = {
            link: link,
            //compile: compile,
            restrict: 'E',
            replace: true,
            scope: {
                //subscription: '='
            },
            templateUrl: 'app/dashboard/directives/templates/gcNews.html'
        };

        function link(scope, element, attrs) {
            
        };
       

        return directive;
    }

});