define(['../bloodPressure.module'], function (module) {

    'use strict';

    module.registerDirective('gcBpProgress', gcBpProgress);

    function gcBpProgress() {

        console.log('Creating gcBpProgress directive.');

        var directive = {
            link: link,
            //compile: compile,
            restrict: 'E',
            replace: true,
            scope: {
                measurements: '='
            },
            templateUrl: 'app/programs/bloodPressure/directives/templates/gcBPProgress.html'
        };

        function link(scope, element, attrs) {

            var maxMeasurementsForItemLabels = 7;

            scope.chartOptions = {
                seriesDefaults: { type: 'line' },
                tooltip: { visible: true, template: ' ${category} - ${value}'},
                categoryAxis: { field: 'RecordDate', labels: { visible: false } },
                dataBound: function (e) {
                    e.sender.options.categoryAxis.labels.visible = e.sender.dataSource.data().length <= maxMeasurementsForItemLabels;
                }
            };

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
                    scope.measurementsData = _.filter(scope.measurements, function (measurement) { return measurement['@Plot'] === 'true'; });
                    scope.measurementsData = _.map(scope.measurementsData, function (measurement) {
                        return {
                            DiastolicAvr: averageConverter(measurement.Diastolic['@Left'], measurement.Diastolic['@Right']),
                            SystolicAvr: averageConverter(measurement.Systolic['@Left'], measurement.Systolic['@Right']),
                            Plot: measurement['@Plot'],
                            HeartRate: measurement['HeartRate'],
                            Notes: measurement['@Notes'],
                            RecordDate: moment(measurement['@RecordDate'], 'YYYY-MM-DD').format('DD/MM/YYYY')
                        }
                    });
               
                    scope.measurementsData = _.sortBy(scope.measurementsData, 'RecordDate');

                    scope.measurementsDataSource = new kendo.data.DataSource({
                        data: scope.measurementsData
                    });
                }

            }, true);
        };


        return directive;
    }

});