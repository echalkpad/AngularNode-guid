define(['../programs.common.module'], function (module) {

    'use strict';

    module.registerDirective('gcHorizontalGauge', gcHorizontalGauge);

    function gcHorizontalGauge() {

        console.log('Creating gcHorizontalGauge directive.');

        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                measurement: '@',
                max: '@',
                type: '@'
            },
            replace: true,
            template: '<div class="progress"><div class="progress-bar" style="width: {{ (measurement * 100) / max }}%">{{ measurement }}</div></div>'
        };

        return directive;

        function link(scope, element, attrs) {
            var readingType = attrs.type;

            attrs.$observe('measurement', function (value) {
                    console.log('updating for: ' + readingType);
                    switch (readingType) {
                        case 'systolic':
                            if (value > 160) {
                                element.children(0).removeClass('progress-bar-success');
                                element.children(0).removeClass('progress-bar-warning');
                                element.children(0).addClass('progress-bar-danger');
                            }
                            else {
                                if (value > 140) {
                                    element.children(0).removeClass('progress-bar-success');
                                    element.children(0).removeClass('progress-bar-danger');
                                    element.children(0).addClass('progress-bar-warning');
                                }
                                else {
                                    if (value > 100) {
                                        element.children(0).removeClass('progress-bar-danger');
                                        element.children(0).removeClass('progress-bar-warning');
                                        element.children(0).addClass('progress-bar-success');
                                    }
                                    else {
                                        element.children(0).removeClass('progress-bar-success');
                                        element.children(0).removeClass('progress-bar-danger');
                                        element.children(0).addClass('progress-bar-warning');
                                    }
                                }
                            }
                            break;
                        case 'diastolic':
                            if (value > 100) {
                                element.children(0).removeClass('progress-bar-success');
                                element.children(0).removeClass('progress-bar-warning');
                                element.children(0).addClass('progress-bar-danger');
                            }
                            else {
                                if (value > 90) {
                                    element.children(0).removeClass('progress-bar-success');
                                    element.children(0).removeClass('progress-bar-danger');
                                    element.children(0).addClass('progress-bar-warning');
                                }
                                else {
                                    if (value > 70) {
                                        element.children(0).removeClass('progress-bar-danger');
                                        element.children(0).removeClass('progress-bar-warning');
                                        element.children(0).addClass('progress-bar-success');
                                    }
                                    else {
                                        element.children(0).removeClass('progress-bar-success');
                                        element.children(0).removeClass('progress-bar-danger');
                                        element.children(0).addClass('progress-bar-warning');
                                    }
                                }
                            }
                    }
                }
            )
            ;
        }
    }

});