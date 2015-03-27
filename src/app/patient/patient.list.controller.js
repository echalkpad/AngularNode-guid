define(['patient/patient.module', 'lodash'], function (module, _) {

    'use strict';

    module.registerController('PatientListController', function ($scope, $interval, $q, dataservice, $state, $modal) {
        
        var vm = {
            loading: false,
            reset: false,
            statusList: ['Invite', 'Approached', 'Enrolled', 'Completed', 'Declined'],
            firstName : '',
            lastName : '',
            selectedStatus: '',
            sortingList: [
                {
                    text: 'Date(Newest first)',
                    sortField: 'LastDispenseDate',
                    sortOrder: 'desc'
                },
                {
                    text: 'Date(Oldest first)',
                    sortField: 'LastDispenseDate',
                    sortOrder: 'asc'
                },
                {
                    text: 'Last name(A-Z)',
                    sortField: 'LastName',
                    sortOrder: 'asc'
                },
                {
                    text: 'Last name(Z-A)',
                    sortField: 'LastName',
                    sortOrder: 'desc'
                }
            ],
            currentPage : 1,
            pageSize : 25

        };

        $scope.vm = vm;
        $scope.vm.selectedSorting = $scope.vm.sortingList[0];

        $scope.viewPatient = function(patient, show) {
            
            if (!patient.documentsLoaded) {
                patient.documentsLoaded = true;

                dataservice.getPatientQualifications(patient.PatientId).then(function (response) {
                    patient.documents = response.data;
                });
            }
            patient.showMore = show;


        };
        
        $scope.openPatient = function(id) {
            $state.go('app.patient', { id: this.patient.PatientId, lastName: this.patient.LastName });
        };

        $scope.getProgramName = function(programId){
            return vm.services.filter(function(s){ return s.ProgramId === programId })[0].ProgramName;
        }

        $scope.expandAll = function (isExpandAll) {
            $scope.isExpandAll = isExpandAll;
            vm.patients.forEach(function(patient) {
                $scope.viewPatient(patient, $scope.isExpandAll);
            });
        }

        function initFilters() {
           
            function sortingFilter(newValue, oldValue) {
                if (newValue === oldValue) { return; }
                if (vm.reset) { return; }

                vm.currentPage = 1;
                getPatients();
            }

            function serviceFilter(newValue, oldValue) {
                if (newValue === oldValue) { return; }
                if (vm.reset) { return; }

                vm.currentPage = 1;
                getPatients(function() {
                    $scope.isExpandAll = true;
                });
            }


            $scope.$watch('vm.firstName', _.debounce(sortingFilter, 500));
            $scope.$watch('vm.lastName', _.debounce(sortingFilter, 500));
            $scope.$watch('vm.selectedService', _.debounce(serviceFilter, 250));
            $scope.$watch('vm.selectedStatus', _.debounce(sortingFilter, 250));
            $scope.$watch('vm.selectedSorting', _.debounce(sortingFilter, 250));

            $scope.$watch('vm.currentPage', _.debounce(function (newValue, oldValue) {
                if (newValue === oldValue) return;
                getPatients();
            }, 250));

        }
        
        $scope.refresh = function(){
            vm.currentPage = 1;
            getPatients();
        }

        $scope.reset = function () {
            vm.reset = true;

            vm.selectedService = null;
            vm.selectedSorting = vm.sortingList[0];
            vm.firstName = '';
            vm.lastName = '';
            vm.selectedStatus = '';
            $scope.isExpandAll = false;

            getPatients();
        }

   

        function activate() {
            var promises = [getPatients(), getPrograms()];
            return $q.all(promises).then(function() {
                console.log('Activated Patients List View');
                initFilters();
            });
        }

        activate();


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


        function getPatients(done) {

            console.log('getPatients');

            $scope.vm.loading = true;
            var programId = vm.selectedService == null ? '' : vm.selectedService.ProgramId;
            var status = vm.selectedStatus == null ? '' : vm.selectedStatus;
            var offset = (vm.currentPage - 1) * vm.pageSize;

            return dataservice.getPatientQualificationLite(vm.firstName, vm.lastName, '', status, programId, vm.selectedSorting.sortField, vm.selectedSorting.sortOrder, offset, vm.pageSize).then(function (response) {
                $scope.vm.loading = false;

                var patients = arrayUnique(response.data.Data, function (a, b) {
                    return a.PatientId === b.PatientId;
                });

                vm.patients = patients;
                vm.total = response.data.Total;

                vm.reset = false;

                if (done) {
                    done();
                }

                return vm.patients;
            });
        }

        function getPrograms() {

            return dataservice.getPrograms().then(function (response) {
                vm.services = response.data;
                return vm.services;
            });
        }

        $scope.getPatient = function() {
            var PatientId = this.patient.PatientId;
            return dataservice.getPatient(PatientId).then(function (response) {
                var patient = vm.patients.filter(function(p) { return PatientId == p.PatientId})[0];
                var index = vm.patients.indexOf(patient);
                patient = angular.extend(patient, response.data);
                vm.patients[index] = patient;
                if ($scope.isExpandAll) {
                    $scope.viewPatient(vm.patients[index], true);
                }
                
            });
        }

    });

});
