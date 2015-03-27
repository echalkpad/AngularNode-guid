define(['../programs.common.module'], function (module) {

    'use strict';

    module.registerDirective('gcPatientDetailsForm', gcPatientDetailsForm);

    function gcPatientDetailsForm() {

        console.log('Creating gcPatientDetailsForm directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                patient: '=',
                ndss: '=',
                name: '@',
                displayEmail: '@',
                displayNdss: '@'
            },
            templateUrl: 'app/programs/common/directives/templates/gcPatientDetailsForm.html'
        };

        function link(scope, element, attrs) {
            //$('#datetimepicker1').datetimepicker({
            //    pickTime: false,
            //    sideBySide: false
            //});
            var loadDateOfBirth = scope.$watch('patient', function (newValue) {
                if (!newValue) { return; }

                scope.dateOfBirth = moment(scope.patient.DateOfBirth, 'DDMMYYYY').format('DD/MM/YYYY');
                loadDateOfBirth();
                watchDateOfBirth();
            }, true);
            

            var watchDateOfBirth = function() {
                scope.$watch('dateOfBirth', function (newValue) {
                    
                    scope.patient.DateOfBirth = moment(scope.dateOfBirth, 'DD/MM/YYYY').format('DDMMYYYY');
                    
                });
            }

        };

        return directive;
    }

});