define(['../bloodGlucose.module', 'jquery-ui'], function (module) {

    'use strict';

    module.registerDirective('gcHba1cMeasurements', gcHba1cMeasurements);


    function gcHba1cMeasurements() {

        console.log('Creating gcHba1cMeasurements directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                hba1cMeasurement: '=',
                name: '@'
            },
            templateUrl: 'app/programs/bloodGlucose/directives/templates/gcHba1cMeasurements.html'
        };

        function link(scope, element, attrs) {

            scope.HbA1cIsAddRecordsEnabled = false;

            scope.measurement = {};
            scope.measurement.HbA1cRecordDate = '';
            scope.measurement.HbA1cNotes = '';
            scope.measurement.HbA1cConductedBy = '';
            scope.measurement.HbA1cMeasureResult = 0;
            scope.measurement.HbA1cPercentResult = 0;

            var loadMeasurement = scope.$watch('hba1cMeasurement', function (newValues) {
                if (!newValues) { return; }

                if (scope.hba1cMeasurement.length > 0) {
                    var hba1cMeasurements = _.sortBy(scope.hba1cMeasurement, '@DateRecorded');
                    var lastMeasurement = hba1cMeasurements[hba1cMeasurements.length - 1];

                    scope.measurement.HbA1cPercentResult = parseInt(lastMeasurement['@ResultPercent']);
                    scope.measurement.HbA1cMeasureResult = parseInt(lastMeasurement['@ResultMeasure']);
                    scope.measurement.HbA1cRecordDate = moment(lastMeasurement['@DateRecorded']).format('DD/MM/YYYY');;
                    scope.measurement.HbA1cNotes = lastMeasurement['@Comments'];
                    scope.measurement.HbA1cConductedBy = lastMeasurement['@ConductedBy'];
                }

                loadMeasurement();
            });
               // listen for the event in the relevant $scope
            scope.$on('saveHba1cMeasurements', function (event, data) {
                if (scope.HbA1cIsAddRecordsEnabled && scope[scope.name].$valid) {
                    scope.save();
                }
            });
            
            scope.add = function() {
                scope.measurement.HbA1cRecordDate = moment().format('DD/MM/YYYY');

                scope.HbA1cIsAddRecordsEnabled = true;
                scope.measurement.HbA1cMeasureResult = 0;
                scope.measurement.HbA1cPercentResult = 0;
                scope.measurement.HbA1cNotes = '';
                scope.measurement.HbA1cConductedBy = '';

            }

            scope.save = function () {

                if (scope[scope.name].$invalid) { return; }

                var measurement = {}

                measurement['@DateRecorded'] = moment(scope.measurement.HbA1cRecordDate, 'DD/MM/YYYY').toISOString();
                measurement['@Comments'] = scope.measurement.HbA1cNotes;
                measurement['@Plot'] = 'true';
                measurement['@ResultMeasure'] = scope.measurement.HbA1cMeasureResult;
                measurement['@ResultPercent'] = scope.measurement.HbA1cPercentResult;
                measurement['@ConductedBy'] = scope.measurement.HbA1cConductedBy;
                
                scope.hba1cMeasurement.push(measurement);
                
                scope.measurement.HbA1cMeasureResult = 0;
                scope.measurement.HbA1cPercentResult = 0;
                scope.measurement.HbA1cNotes = '';
                scope.measurement.HbA1cConductedBy = '';
                
                scope.HbA1cIsAddRecordsEnabled = false;
                
                scope.$emit('saveHba1cMeasurementsInternal');

            }
            
        };
      
        return directive;
    }

});