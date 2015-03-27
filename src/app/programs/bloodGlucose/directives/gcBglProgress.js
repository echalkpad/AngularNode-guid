define(['../bloodGlucose.module'], function (module) {

    'use strict';

    module.registerDirective('gcBglProgress', gcBglProgress);

    function gcBglProgress() {

        console.log('Creating gcBglProgress directive.');

        var directive = {
            link: link,
            //compile: compile,
            restrict: 'E',
            replace: true,
            scope: {
                bglMeasurements: '=',
                hba1cMeasurement: '=',
                name: '@'
            },
            templateUrl: 'app/programs/bloodGlucose/directives/templates/gcBglProgress.html'
        };

        function link(scope, element, attrs) {
            
            var maxMeasurementsForItemLabels = 7;

            scope.chartOptions = {
                seriesDefaults: { type: 'line' },
                tooltip: { visible: true, template: ' ${category} - ${value}'},
                categoryAxis: { field: 'RecordDate', labels: { visible: false} },
                dataBound: function (e) {
                    e.sender.options.categoryAxis.labels.visible = e.sender.dataSource.data().length <= maxMeasurementsForItemLabels;
                }
            };

            scope.BGLAverageMeasurements = [];
            scope.HbA1cAverageMeasurements = [];

            scope.$watch('bglMeasurements', function (newValue) {
                if (!newValue) {
                   return;
                }
                if (scope.bglMeasurements) {
                    scope.BGLAverageMeasurements = _.map(scope.bglMeasurements, function (measurement) {
                        return {
                            RecordDate: moment(measurement['@DateRecorded']).format('DD/MM/YYYY'),
                            Notes: measurement['@Comments'],
                            Plot: measurement['@Plot'] === 'true' ? true : false, 
                            Result: measurement['@Result'],
                            TargetHigh: measurement['@RangeUpperBound'],
                            TargetLow: measurement['@RangeLowerBound'],
                            Type: measurement['@Type'],
                            ConductedBy: measurement['@ConductedBy'],
                            _measurement: measurement
                        }
                    });
                    scope.BGLAverageMeasurements = _.sortBy(scope.BGLAverageMeasurements, 'RecordDate');

                    scope.BGLAverageMeasurementsDataSource = new kendo.data.DataSource({
                        data: _.filter(scope.BGLAverageMeasurements, function (measurement) { return measurement.Plot; })
                    });

                }
            }, true);

            scope.bglPlotChange = function () {
                var item = this.measurement;
                item._measurement['@Plot'] = item.Plot ? 'true' : 'false';
            };

            scope.hba1cPlotChange = function () {
                var item = this.measurement;
                item._measurement['@Plot'] = item.Plot ? 'true' : 'false';
            };

            scope.$watch('hba1cMeasurement', function (newValue) {
                if (!newValue) {
                    return;
                }
                if (scope.hba1cMeasurement) {
                    scope.HbA1cAverageMeasurements = _.map(scope.hba1cMeasurement, function (measurement) {
                        return {
                            RecordDate: moment(measurement['@DateRecorded']).format('DD/MM/YYYY'),
                            Notes: measurement['@Comments'],
                            Plot: measurement['@Plot'] === 'true' ? true : false,
                            ResultMeasure: measurement['@ResultMeasure'],
                            ResultPercent: measurement['@ResultPercent'],
                            ConductedBy: measurement['@ConductedBy'],
                            _measurement: measurement
                        }
                    });

                    scope.HbA1cAverageMeasurements = _.sortBy(scope.HbA1cAverageMeasurements, 'RecordDate');

                    scope.HbA1cAverageMeasurementsDataSource = new kendo.data.DataSource({
                        data: _.filter(scope.HbA1cAverageMeasurements, function (measurement) { return measurement.Plot; })
                    });
                }

            }, true);

            scope.removeHbA1c = function (event) {
                var item = this.measurement,
                   index = scope.hba1cMeasurement.indexOf(item._measurement);

                scope.hba1cMeasurement.splice(index, 1);
            }

            scope.removeBgl = function (event) {
              
                var item = this.measurement,
                 index = scope.bglMeasurements.indexOf(item._measurement);

                scope.bglMeasurements.splice(index, 1);
            }

          
        };
       

        return directive;
    }

});