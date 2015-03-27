define(['patient/patient.module', 'lodash', 'chartjs'], function (module, _) {

    'use strict';

    module.registerController('PatientController', function ($scope, $stateParams, $q, $location, dataservice, $rootScope, $modal) {
        var vm = {};
        $scope.vm = vm;

        vm.allergies = [];
        vm.conditions = [];
        vm.patientAllergies = [];
        vm.patientConditions = [];


        var patientId = parseInt($stateParams.id);
        vm.patientId = patientId;

        activate();

        function activate() {
            $rootScope.loading = true;
            var promises = [
                getPatient(patientId),
                getPatientAllergens(patientId),
                getPatientConditions(patientId),
                getPrograms(),
                getScripts(patientId)
            ];
            return $q.all(promises).then(function () {
                console.log('Activated Patient View');
                $rootScope.loading = false;
            });
        }

        function getPatientQualifications(patientId) {
            return dataservice.getPatientQualifications(patientId).then(function (response) {
                vm.documents = response.data;
            });
        }

        $scope.getProgramName = function (programId) {
            return vm.services.filter(function (s) { return s.ProgramId == programId })[0].ProgramName;
        }

        $scope.edit = function () {
            $modal.open({
                templateUrl: 'app/patient/patient.edit.html',
                controller: 'PatientEditController',
                size: 'lg',
                resolve: {
                    patient: function () { return vm.patient; }
                }
            }).result.then(function (editPatient) {
                vm.patient = editPatient;
            });
        };


        $scope.refreshAllergies = function (searchText) {
            if (searchText) {
                getAllergens(searchText);
            } else {
                vm.allergies = [];
            }
        };

        $scope.addAllergen = function (item) {
            var allergenId = item.AllergenId;
            dataservice.postPatientAllergen(patientId, allergenId).then(function (response) {
                item.PatientAllergenId = response.data;
                console.log('addAllergen:' + item.AllergenText);
            });
        }

        $scope.removeAllergen = function (item) {
            var patientAllergenId = item.PatientAllergenId;
            dataservice.deletePatientAllergen(patientAllergenId).then(function (response) {
                console.log('removeAllergen:' + item.AllergenText);
            });
        }

        $scope.addCondition = function (item) {
            var conditionId = item.ConditionId;
            dataservice.postPatientCondition(patientId, conditionId).then(function (response) {
                item.PatientConditionId = response.data;
                console.log('addCondition:' + item.ConditionName);
            });
        }

        $scope.removeCondition = function (item) {
            var patientConditionId = item.PatientConditionId;
            dataservice.deletePatientCondition(patientConditionId).then(function (response) {
                console.log('removeContion:' + item.ConditionName);
            });
        }

        $scope.loadAllergies = function (searchText) {
            return dataservice.getAllergens(searchText);
        }

        $scope.loadConditions = function (searchText) {
            return dataservice.getConditions(searchText);
        }


        function getPatientAllergens(patientId) {
            return dataservice.getPatientAllergens(patientId).then(function (response) {
                vm.patientAllergies = response.data;
                return vm.patientAllergies;
            });
        }

        function getPatientConditions(patientId) {
            return dataservice.getPatientConditions(patientId).then(function (response) {
                vm.patientConditions = response.data;
                return vm.patientConditions;
            });
        }

        function getAllergens(searchText) {
            return dataservice.getAllergens(searchText).then(function (response) {
                vm.allergies = response.data;
                return vm.allergies;
            });
        }

        function getPatient(patientId) {
            return dataservice.getPatient(patientId).then(function (response) {
                vm.patient = response.data;
                return vm.patient;
            });
        }

        function getPrograms() {

            return dataservice.getPrograms().then(function (response) {
                vm.services = response.data;

                return getPatientQualifications(patientId);
            });
        }

        function getScripts(patientId) {

            return dataservice.getScripts(patientId).then(function (data) {
                vm.scripts = data;
                return vm.scripts;
            });
        }

       



    });


});
