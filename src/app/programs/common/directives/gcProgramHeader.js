define(['../programs.common.module', 'services/directives/gcServicesList'], function (module) {

    'use strict';

    module.registerDirective('gcProgramHeader', gcProgramHeader);

    function gcProgramHeader() {

        console.log('Creating gcProgramHeader directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                patient: '=',
                name: '@',
                displayEmail: '@',
                title: '@',
                programDocumentId: '=',
                preparationDate: '=',
                ndss: '=',
                displayNdss: '@',
                pharmacistInitials: '=',
                displayPharmacistInitials: '@',
                customActionsTemplate: '@',
                patientId: '=',
                reportName: '@'
            },
            templateUrl: 'app/programs/common/directives/templates/gcProgramHeader.html'
        };

        function link(scope, element, attrs) {

            
            var header = $('#programHeader');
            function toogleElements() {
                var elements;
                if (!elements) {
                    elements = $('#programHeader .toogle-show-minimized');
                }

                elements.hide(); setTimeout(function () { elements.show(); }, 50);
            }
          
            var currentMinimized = false;
            $(document).bind('scroll', function () {
                var scrollTop = $(document).scrollTop();
                var minimized = scrollTop >= 220;
                if (minimized) {
                    if (!currentMinimized) {
                        header.addClass('minimized');
                        toogleElements();
                    }
                } else {
                    if (currentMinimized) {
                        header.removeClass('minimized');
                        toogleElements();
                    }
                }
                currentMinimized = minimized;
            });

        };

        return directive;
    }

    module.registerFilter('gcDateOfBirth', function () {
        return function (val) {
            return moment(val, 'DDMMYYYY').format('D MMMM YYYY');
        };
    });
    

});