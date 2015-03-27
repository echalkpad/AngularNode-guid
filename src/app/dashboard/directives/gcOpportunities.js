define(['../dashboard.module'], function (module) {

    'use strict';

    module.registerDirective('gcOpportunities', gcOpportunities);

    function gcOpportunities() {

        console.log('Creating gcOpportunities directive.');

        var directive = {
            link: link,
            //compile: compile,
            restrict: 'E',
            replace: true,
            scope: {
                measurements: '='
            },
            templateUrl: 'app/dashboard/directives/templates/gcOpportunities.html'
        };

        function link(scope, element, attrs) {

            var maxMeasurementsForItemLabels = 7;

            scope.chartOptions = {
                seriesDefaults: { type: 'area'},
                tooltip: { visible: true, template: ' ${category} - ${value}'},
                categoryAxis: { field: 'Date', labels: { visible: false } }
            };

            if (scope.measurements) {
                scope.measurementsData = _.map(scope.measurements, function (measurement) {
                    return {
                        Value: measurement.value,
                        Value2: measurement.value2,
                        Date: moment(measurement.date, 'YYYY-MM-DD').format('DD/MM/YYYY')
                    }
                });

                scope.measurementsData = _.sortBy(scope.measurementsData, 'Date');

                scope.measurementsDataSource = new kendo.data.DataSource({
                    data: scope.measurementsData
                });
            };

        };


        return directive;
    }

});