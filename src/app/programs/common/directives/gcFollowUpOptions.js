define(['../programs.common.module'], function (module) {

    "use strict";

    module.registerDirective('gcFollowUpOptions', gcFollowUpOptions);

    function gcFollowUpOptions() {

        console.log('Creating gcFollowUpOptions directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                name: "@",
                mobileNumber: "=",
                phoneNumber: "=",
                smsReminders: "=",
                followUpCall: "="
            },
            templateUrl: 'app/programs/common/directives/templates/gcFollowUpOptions.html'
        };

        function link(scope, element, attrs) {

        };

        return directive;
    }
});