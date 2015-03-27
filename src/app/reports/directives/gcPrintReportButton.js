define(['../reports.module', 'telerikReportViewer'], function (module) {

    'use strict';

    module.registerDirective('gcPrintReportButton', gcPrintReportButton);

    function gcPrintReportButton() {

        console.log('Creating gcPrintReportButton directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                title: '@',
                reportName: '@'
            },
            templateUrl: 'app/reports/directives/templates/gcPrintReportButton.html'
        };

        function link(scope, element, attrs) {

            scope.updateReport = function() {
                if (scope.$parent.$parent.vm.currentReport !== scope.reportName){
                    console.log("Updating current report from: " + scope.$parent.$parent.vm.currentReport);
                    scope.$parent.$parent.vm.currentReport = scope.reportName;
                    console.log("Updating current report to: " + scope.reportName);
                }

            };

        };

        return directive;
    }
});