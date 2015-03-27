define(['reports/reports.module', 'lodash'], function (module, _) {

    'use strict';

    module.registerController('ReportsController', function ($rootScope, $q, $scope, $interval, dataservice) {
        var vm = {};
        $scope.vm = vm;

        vm.currentReport = "No Report";

        activate();

        function activate() {
            $rootScope.loading = true;
            //var promises = [getSubscriptionStatus()];
            var promises = [];
            return $q.all(promises).then(function () {
                console.log('Activated Reports View');
                $rootScope.loading = false;
            });
        }

        //function getSubscriptionStatus() {
        //    return dataservice.getSubscriptionStatus().then(function (response) {
        //        vm.subscription = response.data;
        //        return vm.subscription;
        //    });
        //}

    });

});
