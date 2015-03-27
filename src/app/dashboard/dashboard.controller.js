define(['dashboard/dashboard.module', 'lodash'], function (module, _) {

    'use strict';

    module.registerController('DashboardController', function ($rootScope, $q, $scope, $interval, dataservice) {
        var vm = {};
        $scope.vm = vm;

        vm.opportunities = {};
        vm.opportunities.measurements = [
            {"date": "2015-02-09T14:00:00.000Z", "value": "12", "value2": "31"},
            {"date": "2015-03-09T14:00:00.000Z", "value": "22", "value2": "34"},
            {"date": "2015-04-09T14:00:00.000Z", "value": "23", "value2": "38"},
            {"date": "2015-05-09T14:00:00.000Z", "value": "28", "value2": "39"},
            {"date": "2015-06-09T14:00:00.000Z", "value": "34", "value2": "45"},
            {"date": "2015-07-09T14:00:00.000Z", "value": "39", "value2": "56"},
            {"date": "2015-08-09T14:00:00.000Z", "value": "52", "value2": "58"}
        ];

        vm.caseStatistics = {
            complete: 223,
            incomplete: 27,
            declined: 20,
            total: 270
        };

        activate();

        function activate() {
            $rootScope.loading = true;
            var promises = [getSubscriptionStatus()];
            return $q.all(promises).then(function () {
                console.log('Activated Dashboard View');
                $rootScope.loading = false;
            });
        }

        function getSubscriptionStatus() {
            return dataservice.getSubscriptionStatus().then(function (response) {
                vm.subscription = response.data;
                return vm.subscription;
            });
        }

    });

});
