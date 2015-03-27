define(['services/services.module', 'lodash'], function (module, _) {

    'use strict';

    module.registerController('ServicesController', function ($rootScope, $q, $scope, $interval, dataservice) {
        var vm = {};
        $scope.vm = vm;

        activate();

        function activate() {
            $rootScope.loading = true;
            
            var promises = [];
            return $q.all(promises).then(function () {
                console.log('Activated Services View');
                $rootScope.loading = false;
            });
        }


    });

});
