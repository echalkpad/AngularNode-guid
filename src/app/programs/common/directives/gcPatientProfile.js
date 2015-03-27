define(['../programs.common.module'], function (module) {

    "use strict";

    module.registerDirective('gcPatientProfile', gcPatientProfile);

    function gcPatientProfile() {

        console.log('Creating gcPatientProfile directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                patient: "=",
                name: "@",
                displayEmail: "@"
            },
            templateUrl: 'app/programs/common/directives/templates/gcPatientProfile.html'
        };

        function link(scope, element, attrs) {
            //$('#datetimepicker1').datetimepicker({
            //    pickTime: false,
            //    sideBySide: false
            //});

        };

        return directive;
    }

});