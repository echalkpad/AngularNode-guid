define(['../bloodPressure.module'], function (module) {

    'use strict';

    module.registerDirective('gcBloodPressureMeasurements', gcBloodPressureMeasurements);

    function gcBloodPressureMeasurements() {

        console.log('Creating gcBloodPressureMeasurements directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                measurements: '=',
                name: '@'
            },
            templateUrl: 'app/programs/bloodPressure/directives/templates/gcBloodPressureMeasurements.html'
        };

        function link(scope, element, attrs) {

            scope.plotChange = function() {
                var item = this.measurement;
                
                item._measurement['@Plot'] = (item.Plot) ? 'true' : 'false';
            }
 
            function averageConverter(value1, value2) {
                if (value1 > 0 && value2 > 0) {
                    return Math.round((value1 + value2) / 2);
                }
                if (value1 > 0) { return value1; }
                if (value2 > 0) { return value2; }
            }

            scope.$watch('measurements', function (newValue) {
                if (!newValue) {
                    return;
                }

                if (scope.measurements) {
                    
                    scope.data = _.map(scope.measurements, function (measurement) {
                        return {
                            DiastolicAvr: averageConverter(measurement.Diastolic['@Left'], measurement.Diastolic['@Right']),
                            SystolicAvr: averageConverter(measurement.Systolic['@Left'], measurement.Systolic['@Right']),
                            Plot: measurement['@Plot'] === 'true' ? true : false,
                            HeartRate: measurement['HeartRate'],
                            Notes: measurement['@Notes'],
                            RecordDate: measurement['@RecordDate'],
                            _measurement : measurement
                        }
                    });

                    scope.data = _.sortBy(scope.data, 'RecordDate');
                    scope.AverageMeasurements = scope.data;

                }

            }, true);

            scope.remove = function () {
                var item = this.measurement,
                    index = scope.measurements.indexOf(item._measurement);

                scope.measurements.splice(index, 1);

            };

        };
      
        return directive;
    }

});