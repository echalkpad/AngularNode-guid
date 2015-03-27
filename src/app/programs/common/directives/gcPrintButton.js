define(['../programs.common.module', 'telerikReportViewer'], function (module) {

    'use strict';

    module.registerDirective('gcPrintButton', gcPrintButton);

    function gcPrintButton(dataservice) {

        console.log('Creating gcPrintButton directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {

            },
            templateUrl: 'app/programs/common/directives/templates/gcPrintButton.html'
        };

        function link(scope, element, attrs) {
            scope.saveCase = function(){
                scope.$parent.$parent.vm.print();
            }
        };

        return directive;
    }
});