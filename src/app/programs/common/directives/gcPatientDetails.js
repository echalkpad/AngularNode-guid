define(['../programs.common.module'], function (module) {

    "use strict";

    module.registerDirective('gcPatientDetails', gcPatientDetails);

    function gcPatientDetails() {

        console.log('Creating gcPatientDetails directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                patient: "=",
                name: "@",
                displayEmail: "@"
            },
            templateUrl: 'app/programs/common/directives/templates/gcPatientDetails.html'
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