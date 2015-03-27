define(['../bloodPressure.module'], function (module) {

    'use strict';

    module.registerDirective('gcBloodPressure', gcBloodPressure);

    function gcBloodPressure() {

        console.log('Creating gcBloodPressure directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                measurements: '=',
                actions: '=',
                pharmacist: '=',
                patientHistory: '=',
                name: '@'
            },
            templateUrl: 'app/programs/bloodPressure/directives/templates/gcBloodPressure.html'
        };

        function link(scope, element, attrs) {
            scope.IsNewRecordsEnabled = false;

            function clearData() {
                scope.NewSystolicLeftRecord = '';
                scope.NewSystolicRightRecord = '';
                scope.NewDiastolicLeftRecord = '';
                scope.NewDiastolicRightRecord = '';
                scope.NewHeartRateRecord = 0;
                scope.NewMeasurementRecordDate = moment().format('DD/MM/YYYY');;
                scope.SystolicAverage = 0;
                scope.DiastolicAverage = 0;
                scope.Notes = '';
                scope.pharmacist = '';

            }

            clearData();

            scope.minMeasurementValue = 5;
            scope.maxMeasurementValue = 300;

            scope.add = function() {
                scope.IsNewRecordsEnabled = true;
                clearData();
            };
            //Conditions
            //HasCoronaryHeartCondition

            scope.$watch('patientHistory', function (patientHistory) {
                if (!patientHistory) {
                    return;
                }
                scope.coronaryHeartCondition = _.find(patientHistory.Conditions.Condition, function (item) { return item['@Name'] === 'CoronaryHeartDisease' });
                scope.diabetesCondition = _.find(patientHistory.Conditions.Condition, function (item) { return item['@Name'] === 'Diabetes' });
                scope.chronicKidneyDiseaseCondition = _.find(patientHistory.Conditions.Condition, function (item) { return item['@Name'] === 'ChronicKidneyDisease' });
                scope.proteinuriaCondition = _.find(patientHistory.Conditions.Condition, function (item) { return item['@Name'] === 'Proteinuria' });
                scope.strokeTiaCondition = _.find(patientHistory.Conditions.Condition, function (item) { return item['@Name'] === 'StrokeTIA' });


            });
            

            // listen for the event in the relevant $scope
            scope.$on('saveBpMeasurements', function (event, data) {
                if (scope.IsNewRecordsEnabled && scope[scope.name].$valid) {
                    scope.save();
                }
            });

            scope.save = function () {
                if (scope[scope.name].$invalid) {
                    return;
                }
                scope.IsNewRecordsEnabled = false;

                var measurement = {}
                measurement['@Plot'] = 'true';

                measurement.Diastolic = {};
                measurement.Diastolic['@Left'] = scope.NewDiastolicLeftRecord || 0;
                measurement.Diastolic['@Right'] = scope.NewDiastolicRightRecord || 0;

                measurement.Systolic = {};
                measurement.Systolic['@Left'] = scope.NewSystolicLeftRecord || 0;
                measurement.Systolic['@Right'] = scope.NewSystolicRightRecord || 0;

                measurement['HeartRate'] = scope.NewHeartRateRecord;
                measurement['@RecordDate'] = moment(scope.NewMeasurementRecordDate, 'DD/MM/YYYY').format('YYYY-MM-DD');
                measurement['@Notes'] = scope.Notes;

                scope.measurements.push(measurement);
                
                scope.$emit('saveBpMeasurementsInternal', measurement['@RecordDate']);

                clearData();
                
            };

            function averageConverter(value1, value2) {
                if (value1 > 0 && value2 > 0) {
                    return Math.round((value1 + value2) / 2);
                }
                if (value1 > 0) { return value1; }
                if (value2 > 0) { return value2; }
            }
            
            scope.$watchCollection('[NewSystolicLeftRecord, NewSystolicRightRecord]', function () {
                scope.SystolicAverage = averageConverter(scope.NewSystolicLeftRecord, scope.NewSystolicRightRecord);

            });

            scope.$watchCollection('[NewDiastolicLeftRecord, NewDiastolicRightRecord]', function () {
                scope.DiastolicAverage = averageConverter(scope.NewDiastolicLeftRecord, scope.NewDiastolicRightRecord);
            });
            
        };

        return directive;
    }

});