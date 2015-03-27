define(['../programs.common.module', 'select2'], function (module) {

    "use strict";

    module.registerDirective('multiSelect', multiSelect);

    function multiSelect() {

        console.log('Creating multiSelect directive.');

        var directive = {
            restrict: 'A',
            compile: function (element, attributes) {
                element.removeAttr('multi-select');
                element.select2();
                console.log('in multiSelect directive.');
            }
        };

        return directive;
    };
});