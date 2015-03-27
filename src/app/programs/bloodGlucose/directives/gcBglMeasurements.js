define(['../bloodGlucose.module', 'jquery-ui', 'bootstrap-slider'], function (module) {

    'use strict';

    module.registerDirective('gcBglMeasurements', gcBglMeasurements);

    function gcBglMeasurements() {

        console.log('Creating gcBglMeasurements directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                bglMeasurements: '=',
                bglAttributes: '=',
                diabetesType: '=',
                name: '@'
            },
            templateUrl: 'app/programs/bloodGlucose/directives/templates/gcBglMeasurements.html'
        };

        function link(scope, element, attrs) {

            scope.BGLIsNewRecordsEnabled = false;
            scope.BGLTargetRangeError = false;

            scope.measurement = {};
            scope.measurement.BGLNotes = '';
            scope.measurement.BGLRecordDate = '';
            scope.measurement.BGLConductedBy = '';
            scope.measurement.BGLResult = 0;
            scope.measurement.BGLTargetLow = 0;
            scope.measurement.BGLTargetHigh = 0;
            scope.measurement.BGLTestType = '';

            //scope[scope.name].$setValidity()
        
            var loadMeasurement = scope.$watch('bglMeasurements', function (newValues) {
                if (!newValues) { return; }

                if (scope.bglMeasurements.length > 0) {
                    var bglMeasurements = _.sortBy(scope.bglMeasurements, '@DateRecorded');
                    var lastMeasurement = bglMeasurements[scope.bglMeasurements.length-1];
                    scope.measurement.BGLResult = parseInt(lastMeasurement['@Result']);
                    scope.measurement.BGLTargetLow = parseInt(lastMeasurement['@RangeLowerBound']);
                    scope.measurement.BGLTargetHigh = parseInt(lastMeasurement['@RangeUpperBound']);
                    scope.measurement.BGLNotes = lastMeasurement['@Comments'];
                    scope.measurement.BGLConductedBy = lastMeasurement['@ConductedBy'];
                    //debug
                    //scope.measurement.BGLTestType = 'Fasting';
                    //scope.measurement.BGLRecordDate = '10/10/2010';
                    //scope[scope.name].$valid = true;
                    //scope[scope.name].$invalid = false;
                    
                }

                ////scope[scope.name].BGLResult.$setValidity('min', true);
                //scope[scope.name].BGLTargetLow.$setValidity('min', true);
                //scope[scope.name].BGLTargetHigh.$setValidity('min', true);

                //scope[scope.name].BGLTargetLow.$setValidity('max', true);
                //scope[scope.name].BGLTargetHigh.$setValidity('max', true);

                loadMeasurement();
            });

            scope.add = function () {
                
                scope.measurement.BGLResult = 0;
                scope.measurement.BGLTestType = '';
                scope.measurement.BGLNotes = '';
                scope.measurement.BGLRecordDate = moment().format('DD/MM/YYYY');

                ////scope[scope.name].BGLResult.$setValidity('min', false);
                //scope[scope.name].BGLTargetLow.$setValidity('min', false);
                //scope[scope.name].BGLTargetHigh.$setValidity('min', false);

                //scope[scope.name].BGLTargetLow.$setValidity('max', false);
                //scope[scope.name].BGLTargetHigh.$setValidity('max', false);

                scope.BGLIsNewRecordsEnabled = true;
            }

            scope.DisplayResultsRange = false;
            
            scope.$watch('measurement.BGLResult', function (newValues) {
                updateView();
            });
            scope.$watch('measurement.BGLTargetLow', function (newValues) {
                updateView();
            });
            scope.$watch('measurement.BGLTargetHigh', function (newValues) {
                updateView();
            });

            function updateView() {
                scope.BGLWithinRange = (scope.measurement.BGLResult >= scope.measurement.BGLTargetLow && scope.measurement.BGLResult <= scope.measurement.BGLTargetHigh);

                scope.HypoWarning = scope.measurement.BGLResult > 4;
                scope.ChartWarning = scope.measurement.BGLResult > 15;
                if (scope.BGLIsNewRecordsEnabled) {
                    scope.BGLTargetRangeError = (scope.measurement.BGLTargetLow >= scope.measurement.BGLTargetHigh);
                }

                scope.DisplayResultsRange = (scope.measurement.BGLTargetLow > 0 && scope.measurement.BGLTargetHigh > 0);
            }
            
            // listen for the event in the relevant $scope
            scope.$on('saveBglMeasurements', function (event, data) {
                if (scope.BGLIsNewRecordsEnabled && scope[scope.name].$valid) {
                    scope.save();
                }
            });

            scope.save = function () {
              
                if (scope[scope.name].$invalid){ return; }

                var measurement = {}
                
                measurement['@DateRecorded'] = moment(scope.measurement.BGLRecordDate, 'DD/MM/YYYY').toISOString();
                measurement['@TimeRecorded'] = moment().toISOString();
                measurement['@Comments'] = scope.measurement.BGLNotes;
                measurement['@Plot'] = 'true';
                measurement['@Result'] = scope.measurement.BGLResult.toString();
                measurement['@RangeUpperBound'] = scope.measurement.BGLTargetHigh.toString();
                measurement['@RangeLowerBound'] = scope.measurement.BGLTargetLow.toString();
                measurement['@ConductedBy'] = scope.measurement.BGLConductedBy;
                measurement['@Type'] = scope.measurement.BGLTestType;
               
                scope.bglMeasurements.push(measurement);


                scope.measurement.BGLResult = 0;
                scope.measurement.BGLConductedBy = '';
                scope.measurement.BGLTestType = '';
                scope.measurement.BGLNotes = '';
                scope.measurement.BGLRecordDate = moment().format('DD/MM/YYYY');

                scope.BGLIsNewRecordsEnabled = false;
                
                scope.$emit('saveBGLMeasurementsInternal');
            }

        };
      
        return directive;
    }

});