define(['../reports.module', 'telerikReportViewer'], function (module) {

    'use strict';

    module.registerDirective('gcReportsList', gcReportsList);

    function gcReportsList(dataservice) {

        console.log('Creating gcReportsList directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
            },
            templateUrl: 'app/reports/directives/templates/gcReportsList.html'
        };

        function link(scope, element, attrs) {
        };

        return directive;
    }
});