define(['../programs.common.module', 'jquery-ui'], function (module) {
    "use strict";

    return module.registerDirective('gcDatepicker', function() {
        return {
            restrict: 'A',
            require: 'ngModel',
            //compile: function(tElement, tAttributes) {
            link: function (scope, tElement, tAttributes, ngModelCtrl) {
                tElement.removeAttr('gcDatepicker');

                var onSelectCallbacks = [];
                if (tAttributes.minRestrict) {
                    onSelectCallbacks.push(function(selectedDate) {
                        $(tAttributes.minRestrict).datepicker('option', 'minDate', selectedDate);
                    });
                }
                if (tAttributes.maxRestrict) {
                    onSelectCallbacks.push(function(selectedDate) {
                        $(tAttributes.maxRestrict).datepicker('option', 'maxDate', selectedDate);
                    });
                }

                var options = {
                    prevText: '<i class="fa fa-chevron-left"></i>',
                    nextText: '<i class="fa fa-chevron-right"></i>',
                    onSelect: function(selectedDate) {
                        angular.forEach(onSelectCallbacks, function(callback) {
                            callback.call(this, selectedDate);
                        });
                        scope.$apply(function () {
                            ngModelCtrl.$setViewValue(selectedDate);
                        });
                    }
                };


                if (tAttributes.numberOfMonths) options.numberOfMonths = parseInt(tAttributes.numberOfMonths);

                if (tAttributes.dateFormat) options.dateFormat = tAttributes.dateFormat;

                if (tAttributes.defaultDate) options.defaultDate = tAttributes.defaultDate;

                if (tAttributes.changeMonth) options.changeMonth = tAttributes.changeMonth == "true";


                tElement.datepicker(options);
            }
        };
    });
});