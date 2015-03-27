define(['../patient.module', 'patient/directives/gcAddPatient'], function (module) {

    'use strict';

    module.registerDirective('gcSelectPatient', gcSelectPatient);

    function gcSelectPatient($modal) {

        console.log('Creating gcSelectPatient directive.');

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                gcSelectPatient: '&'
            }
        };

        var SelectPatientController = function ($scope, $q, $modalInstance, dataservice) {
            var vm = {
                firstName: '',
                lastName: '',
                currentPage: 1,
                pageSize: 15,
                selectedPatient: null
            };

            $scope.vm = vm;

            $scope.continue = function () {
                $modalInstance.close({ patient: { patientId: vm.selectedPatient.PatientId } });
            };

            $scope.cancel = function () {
                $modalInstance.dismiss('cancel');
            };

            function activate() {
                var promises = [getPatients()];
                return $q.all(promises).then(function () {
                    console.log('Activated Select Patients List ');
                });
            }

            activate();

            function sortingFilter(newValue, oldValue) {
                if (newValue === oldValue) { return; }
                if (vm.reset) { return; }

                vm.currentPage = 1;
                vm.selectedPatient = null;
                getPatients();
            }

            $scope.$watch('vm.firstName', _.debounce(sortingFilter, 500));
            $scope.$watch('vm.lastName', _.debounce(sortingFilter, 500));
            $scope.$watch('vm.currentPage', _.debounce(function (newValue, oldValue) {
                if (newValue === oldValue) return;
                vm.selectedPatient = null;
                getPatients();
            }, 250));

            function arrayUnique(array, comparer) {
                var a = array.concat();
                for (var i = 0; i < a.length; ++i) {
                    for (var j = i + 1; j < a.length; ++j) {
                        if (comparer(a[i], a[j])) {

                            a.splice(j--, 1);
                        }
                    }
                }

                return a;
            };

            function getPatients() {

                console.log('getPatients');

                $scope.vm.loading = true;

                var status = vm.selectedStatus == null ? '' : vm.selectedStatus;
                var offset = (vm.currentPage - 1) * vm.pageSize;

                return dataservice.getPatientQualificationLite(vm.firstName, vm.lastName, '', status, '', 'LastDispenseDate', 'desc', offset, vm.pageSize).then(function (response) {

                    var patients = arrayUnique(response.data.Data, function (a, b) {
                        return a.PatientId === b.PatientId;
                    });

                    vm.patients = patients;
                    vm.total = response.data.Total;
                    $scope.vm.loading = false;

                    return vm.patients;
                });
            }


            $scope.getPatient = function () {
                var PatientId = this.patient.PatientId;
                return dataservice.getPatient(PatientId).then(function (response) {
                    var patient = vm.patients.filter(function (p) { return PatientId === p.PatientId })[0];
                    var index = vm.patients.indexOf(patient);
                    patient = angular.extend(patient, response.data);
                    vm.patients[index] = patient;
                    if ($scope.isExpandAll) {
                        $scope.viewPatient(vm.patients[index], true);
                    }

                });
            }
            $scope.$on('patient.new', function (event, data) {
                $modalInstance.close({ patient: data });
            });
            
        };

        function link(scope, element, attrs) {
            element.bind('click', function () {
                if (attrs.gcSelectPatientActive === 'true') {
                    var modalInstance = $modal.open({
                        templateUrl: 'app/patient/directives/templates/gcSelectPatientModal.html',
                        controller: SelectPatientController,
                        size: 'lg'
                    });

                    modalInstance.result.then(function (patient) {
                        scope.gcSelectPatient(patient);
                    }, function () {
                        //Modal dismissed
                    });
                }
            });
        };

        return directive;
    }
});