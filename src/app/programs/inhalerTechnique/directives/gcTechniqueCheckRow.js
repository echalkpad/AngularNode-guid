define(['../inhalerTechnique.module'], function (module) {

    'use strict';

    module.registerDirective('gcTechniqueCheckRow', gcTechniqueCheckRow);

    function gcTechniqueCheckRow() {

        console.log('Creating gcTechniqueCheckRow directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                order: '@',
                text: '@',
                item: '='
            },
            templateUrl: 'app/programs/inhalerTechnique/directives/templates/gcTechniqueCheckRow.html'
        };

        function link(scope, element, attrs) {

        };

        return directive;
    }

});