define(['../inhalerTechnique.module'], function (module) {

    'use strict';

    module.registerDirective('gcTechniqueCheck', gcTechniqueCheck);

    function gcTechniqueCheck() {

        console.log('Creating gcTechniqueCheck directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                name: '@',
                inhalerVisibility: '=',
                document: '='
            },
            templateUrl: 'app/programs/inhalerTechnique/directives/templates/gcTechniqueCheck.html'
        };

        function link(scope, element, attrs) {

        };

        return directive;
    }

});