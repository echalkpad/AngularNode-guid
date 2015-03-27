define(['../programs.common.module'], function (module) {

    'use strict';

    module.registerDirective('shownValidation', shownValidation);

    function shownValidation() {

        console.log('Creating shownValidation directive.');

        var directive = {
            require: '^form',
            restrict: 'A',
            link: function (scope, element, attrs, form) {
                var control;

                //scope.$watch(attrs.ngShow, function (value) {
                scope.$watchCollection('[' + attrs.ngDisabled + ',' + attrs.enableValidation + ']', function (values) {
                    
                    var disabledControl = values[0], enableValidation = values[1];
                    setValidation(!disabledControl);
                    //if (disabledControl) {
                    //    setValidation(false);
                    //    return;
                    //}

                    ////use this property only for enabled controls
                    //if (enableValidation !== undefined) {
                    //    setValidation(enableValidation);
                    //}

                });
                

                function setValidation(value) {
                    
                    if (!control) {
                        control = form[element.attr('name')];
                    }
                    //console.log('setValidation=' + element.attr('name') + '::::: $name=' + control.$name + ' ;;VALUE = ' + value);
                    if (value === false) {
                        form.$removeControl(control);
                    } else {
                        form.$addControl(control);
                        angular.forEach(control.$error, function (validity, validationToken) {
                            form.$setValidity(validationToken, !validity, control);
                            //form.$setValidity(validationToken, false, control);
                        });   
                    }
                }
            }
        };

        return directive;
    };
});