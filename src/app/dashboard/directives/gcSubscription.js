define(['../dashboard.module'], function (module) {

    'use strict';

    module.registerDirective('gcSubscription', gcSubscription);

    function gcSubscription() {

        console.log('Creating gcSubscription directive.');

        var directive = {
            link: link,
            //compile: compile,
            restrict: 'E',
            replace: true,
            scope: {
                subscription: '='
            },
            templateUrl: 'app/dashboard/directives/templates/gcSubscription.html'
        };

        function link(scope, element, attrs) {
            
        };
       

        return directive;
    }

});