define(['../bloodGlucose.module'], function (module) {

    'use strict';

    module.registerDirective('gcBglGauge', gcHorizontalGauge);

    function gcHorizontalGauge() {

        console.log('Creating gcBglGauge directive.');

        var directive = {
            link: link,
            restrict: 'E',
            scope: {
                measurement: '=',
                diabetesType: '='
            },
            replace: true,
            template: '<div class="bgl-gauge"><i class="fa fa-play fa-rotate-90 current-pointer" style="left: {{resultPosition}}%"></i><div class="progress-bar progress-bar-danger" style="width: {{ lowWidth }}%" ></div><div class="progress-bar progress-bar-success" style="width:{{ goodRange}}%" ></div>' +
                      '<div class="progress-bar progress-bar-danger" style="width: {{ highWidth }}%" ></div><div class="clearfix"></div><div class="bgl-gauge-grid"><div class="bgl-gauge-cell" style="width: {{cellWidth}}%" data-ng-repeat="i in getMaxNumber() track by $index"><span>{{$index+1}}</span></div><span class="lastIndex" style="right: 0px;">{{maxNumber+1}}</span></div></div>'
        };

        return directive;

        function link(scope, element, attrs) {
            scope.maxNumber = 14;
            scope.cellWidth = (100 / scope.maxNumber);
            
            scope.getMaxNumber = function () { return new Array(scope.maxNumber); };
            
            scope.$watch('measurement', function (newValue) {
                if (!newValue) return;
                calcView();
            }, true);
            
            scope.$watch('diabetesType', function (diabetesType, testType) {
                console.log('DiabetesTyp=' + diabetesType);
                setBGLTargets(diabetesType, scope.testType);
            });
            scope.$watch('measurement.BGLTestType', function (testType) {
                console.log('testType=' + testType);
                setBGLTargets(scope.diabetesType, testType);
            });
            

            function setBGLTargets(diabetesType, testType) {
                
                if (diabetesType && testType) {
                    if (_.isEqual(diabetesType, 'Type 1 Diabetes')) {
                        if (_.isEqual(testType, 'Fasting') || _.isEqual(testType, 'Before meals')) {
                            scope.measurement.BGLTargetLow = 4;
                            scope.measurement.BGLTargetHigh = 6;
                        }
                        else {
                            if (_.isEqual(testType, '2 hours after meals')) {
                                scope.measurement.BGLTargetLow = 4;
                                scope.measurement.BGLTargetHigh = 8;
                            }
                            else {
                                scope.measurement.BGLTargetLow = 4;
                                scope.measurement.BGLTargetHigh = 10;
                            }
                        }
                    }
                    else {
                        if (_.isEqual(testType, 'Type 2 Diabetes')) {
                            if (_.isEqual(testType, 'Fasting') || _.isEqual(testType, 'Before meals')) {
                                scope.measurement.BGLTargetLow = 4;
                                scope.measurement.BGLTargetHigh = 8;
                            }
                            else {
                                if (_.isEqual(testType, '2 hours after meals')) {
                                    scope.measurement.BGLTargetLow = 6;
                                    scope.measurement.BGLTargetHigh = 10;
                                }
                                else {
                                    scope.measurement.BGLTargetLow = 4;
                                    scope.measurement.BGLTargetHigh = 10;
                                }
                            }
                        }
                    }
                }
            }
            
            scope.$watch('diabetesType', function (diabetesType) {
                if (!diabetesType) return;
                
                setBGLTargets(diabetesType, scope.measurement.BGLTestType);
                
            }, true);
            
            function calcView() {
                if (!scope.measurement) { return; }
                               

                scope.lowWidth = scope.measurement.BGLTargetLow == 0 ? 0 : (scope.measurement.BGLTargetLow - 1) * scope.cellWidth;
                scope.highWidth = scope.measurement.BGLTargetHigh == 0 ? 0 : (scope.maxNumber - scope.measurement.BGLTargetHigh + 1) * scope.cellWidth;
                scope.goodRange = (scope.measurement.BGLTargetLow == 0 && scope.measurement.BGLTargetHigh) ? 0 : (scope.measurement.BGLTargetHigh - scope.measurement.BGLTargetLow) * scope.cellWidth;

                if ((scope.lowWidth + scope.highWidth) > 100) {
                    scope.lowWidth = 0;
                    scope.highWidth = 0;
                    scope.goodRange = 0;
                }

                scope.resultPosition = scope.measurement.BGLResult == 0 ? 0 : ((scope.measurement.BGLResult - 1) * scope.cellWidth);
                
            }
        }
    }

});