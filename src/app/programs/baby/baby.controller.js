define(['programs/bloodGlucose/bloodGlucose.module', 'lodash'], function (module, _) {

    'use strict';

    module.registerController('BloodGlucoseController', function ($scope, $rootScope, $interval, dataservice, $q, $stateParams, programsCommon, $location) {
       
        var vm = {};
        $scope.vm = vm;
        vm.programDocument = {};
        vm.statusList = [
            { value: 'Approached', text: 'Approached' },
            { value: 'Enrolled', text: 'Enrolled' },
            { value: 'Declined', text: 'Declined' }
        ];
        vm.programMoniker = 'PS.BABY2012',
        vm.programModelName = 'PSGlucoseRecordingModel',
        vm.programModelText = 'Blood Glucose',

        vm.patientId = parseInt($stateParams.patientId),
        vm.isNew = ($stateParams.documentId === 'new'),
        vm.defaultStatus = vm.statusList[1];
        vm.ProgramDocumentId = vm.isNew ? 0 : parseInt($stateParams.documentId);
        vm.PatientQualificationId = ($stateParams.patientQualificationId === '') ? 0 : parseInt($stateParams.patientQualificationId);

        vm.save = function save() {

            $scope.$broadcast('saveBglMeasurements');
            $scope.$broadcast('saveHba1cMeasurements');
           
            programsCommon.postProgramDocument(vm.document, vm.caseStatus).then(function (res) {
                $.smallBox({
                    title: vm.programModelText + ' Program save successfully',
                    //content: '<i class=\'fa fa-clock-o\'></i> <i>2 seconds ago...</i>',
                    color: '#739E73',
                    iconSmall: 'fa fa-check bounce animated',
                    timeout: 4000
                });
                if (vm.isNew) {
                    vm.isNew = false;
                    //var url = '/patient/' + vm.patientId + '/' + $stateParams.lastName + '/bloodPressure/' + res.ProgramDocumentId + '/' + res.PatientQualificationId;
                    //$location.path(url);
                }
            });
        };

        vm.print = function print() {
            vm.save();
            window.print();
        };

        vm.email = function email() {
            alert('Email case: ');
        };


        /******** Custom model functions ***********/

        function prepareDocument(programDocument) {
            
            var document = _.clone(programDocument, true);

            //remove hash key and etc from medications
            document.BGLMedications.BGLMedication = JSON.parse(angular.toJson(document.BGLMedications.BGLMedication));
            if (document.BGLMeasurements.BGLMeasurement.length === 0) {
                document.BGLMeasurements = null;
            }
            if (document.HbA1cMeasurements.HbA1cMeasurement.length === 0) {
                document.HbA1cMeasurements = null;
            }
            if (vm.caseStatus === 'PatientRequested') {
                document['@ClaimReference'] = moment().toISOString();
            }

            var programData = {};
            programData[vm.programModelName] = document;
            var stringXML = ('<?xml version="1.0"?>') + json2xml(programData);
            return stringXML;
        }

        function documentToModel(document) {

            document.BloodPressureMeasurements = programsCommon.convertGcArray(document.BloodPressureMeasurements, 'BloodPressureMeasurements');
            document.Actions = programsCommon.convertGcArray(document.Actions, 'Actions');

            document.BGLAttributes = document.BGLAttributes || {};
            
            document.BGLAttributes['@NDSSNumber'] = document.BGLAttributes['@NDSSNumber'] || '';
            document.BGLAttributes['@DiabetesType'] = document.BGLAttributes['@DiabetesType'] || '';
            document.BGLAttributes['@DiabetesOtherDetail'] = document.BGLAttributes['@DiabetesOtherDetail'] || '';
            document.BGLAttributes['@InsulinUser'] = document.BGLAttributes['@InsulinUser'] || 'false';
            document.BGLAttributes['@DiabetesActionPlan'] = document.BGLAttributes['@DiabetesActionPlan'] || 'false';           
            document.BGLAttributes['@SelfMonitorDeviceType'] = document.BGLAttributes['@SelfMonitorDeviceType'] || '';
            document.BGLAttributes['@SelfMonitorTestFrequency'] = document.BGLAttributes['@SelfMonitorTestFrequency'] || '';
            document.BGLAttributes['@SelfMonitorTestFrequencyDetail'] = document.BGLAttributes['@SelfMonitorTestFrequencyDetail'] || '';
            document.BGLAttributes['@SelfMonitorReason'] = document.BGLAttributes['@SelfMonitorReason'] || '';

            document.BGLMeasurements = programsCommon.convertGcArray(document.BGLMeasurements, 'BGLMeasurements');
            document.HbA1cMeasurements = programsCommon.convertGcArray(document.HbA1cMeasurements, 'HbA1cMeasurements');
            document.BGLMedications = programsCommon.convertGcArray(document.BGLMedications, 'BGLMedications');
            
            return document;

        }

        /*******************/
        var callbacks = {
            prepareDocumentCallback: prepareDocument,
            documentToModelCallback: documentToModel
        }

        programsCommon.init(vm, callbacks);
        programsCommon.activate();


    });

});
