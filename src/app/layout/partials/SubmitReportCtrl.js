define(['layout/module'], function (module) {

    'use strict';
    module.registerController('SubmitReportCtrl', function($scope) {
        $scope.step = 0;
        $scope.next = function() {
            $scope.step += 1;
        }

        $scope.cancel = function() {
            $scope.step = 0;
        }

        $scope.submit = function() {

        }

        $scope.openChat = function() {
            $zopim.livechat.window.show();
        }
    });
});