define(['../programs.common.module'], function (module) {

    "use strict";

    module.registerDirective('gcCaseActions', gcCaseActions);

    function gcCaseActions() {

        console.log('Creating gcCaseActions directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                name: "@",
                programForm: "="
            },
            templateUrl: 'app/programs/common/directives/templates/gcCaseActions.html'
        };

        function link(scope, element, attrs) {

        };

        return directive;
    }
});