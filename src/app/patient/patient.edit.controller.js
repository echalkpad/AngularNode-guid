define(['patient/patient.module', 'lodash'], function(module, _) {

    'use strict';

    module.registerController('PatientEditController', function ($scope, $interval, $q, $filter, dataservice, $state, $modalInstance, patient) {
        console.log('Load PatientEditController');

        $scope.patient = angular.copy(patient);
        
        $scope.patient.DateOfBirth = $filter('date')($scope.patient.DateOfBirth, 'dd/MM/yyyy');

        $scope.save = function() {
            $scope.patient.DateOfBirth =  $scope.parse($scope.patient.DateOfBirth);
            dataservice.putPatient($scope.patient).then(function(data) {
                console.log(data);
                $modalInstance.close($scope.patient);
            });
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        $scope.parse = function(input) {

            var parts = input.split('/');   
            if (parts.length == 3) {
                return $filter('date')(new Date(parts[2], parts[1]-1, parts[0]), 'yyyy-MM-dd');     
            }           
            else {
                return $filter('date')(new Date(), 'yyyy-MM-dd');
            }
            
        }
    });
});