define(['../programs.common.module'], function (module) {

    "use strict";

    module.registerDirective('gcCaseStatus', gcCaseStatus);

    function gcCaseStatus() {

        console.log('Creating gcCaseStatus directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                name: "@",
                programForm: "="
            },
            templateUrl: 'app/programs/common/directives/templates/gcCaseStatus.html'
        };

        function link(scope, element, attrs) {

        };

        return directive;
    }
});