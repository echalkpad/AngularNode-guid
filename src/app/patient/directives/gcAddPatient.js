define(['../patient.module'], function (module) {

    'use strict';

    module.registerDirective('gcAddPatient', gcAddPatient);

    function gcAddPatient($modal, $state) {

        console.log('Creating gcAddPatient directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                navigateOnAdd: '@'
            },
            template: '<button class="btn btn-labeled btn-success" data-ng-click="addPatient()"> <span class="btn-label"><i class="glyphicon glyphicon-plus"></i></span>Add patient </button>'
        };

        function link(scope, element, attrs) {

            function showPatientWarning(callback) {
                $.SmartMessageBox({
                    title: '<i class="fa fa-warning" style="color:#dfb56c"></i> Warning! Add New Patient',
                    content: 'You should only add a patient using this method if they do not already exist in GuildCare. Please check using the search function if you think they may already exist. <br/><br/>' +
                    'If you believe you will be dispensing to this patient regularly it is recommended to add them in your dispense system and dispense. This will add them to GuildCare automatically with a full set of data which will make enrolling them to future programs easier and less prone to error. <br/><br/>' +
                    'If you still want to process please enter your initials and click "OK". Otherwise click "Cancel".',
                    buttons: '[Cancel][OK]',
                    input: 'text',
                    inputValue: '',
                    placeholder: 'Enter your user Initials'
                }, function (ButtonPress, Value) {

                    if (ButtonPress === 'OK') {
                        if (callback) {
                            callback();
                        }
                    }
                });

                $('#bot2-Msg1').attr('disabled', 'disabled');
                $('#txt1').keyup(function () {
                    if ($(this).val().length >= 2) {
                        $('#bot2-Msg1').removeAttr('disabled');
                    } else {
                        $('#bot2-Msg1').attr('disabled', 'disabled');
                    }
                });
            }

            scope.addPatient = function () {
                showPatientWarning(function () {
                    $modal.open({
                        templateUrl: 'app/patient/directives/templates/gcAddPatientModal.html',
                        controller: 'PatientCreateController',
                        size: 'lg'
                    }).result.then(function (patient) {
                        if (scope.navigateOnAdd) {
                            $state.go('app.patient', { id: patient.patientId, lastName: patient.lastName });
                        } else {
                            scope.$emit('patient.new', patient);
                        }
                    });
                });
            }

        };

        return directive;
    }

    module.registerController('PatientCreateController', function ($scope, $interval, $q, dataservice, $modalInstance) {
        console.log('Load PatientCreateController');

        $scope.save = function () {
            dataservice.postPatient($scope.patient).then(function (data) {
                console.log(data);
                $modalInstance.close({ patientId: data, lastName: $scope.patient.lastname });
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

    });

});