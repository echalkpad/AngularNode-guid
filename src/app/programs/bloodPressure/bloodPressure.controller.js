define(['programs/bloodPressure/bloodPressure.module', 'lodash'], function (module, _) {

    'use strict';

    module.registerController('BloodPressureController', function ($scope, $interval, dataservice, $q, $stateParams, $rootScope, programsCommon, $location) {
        var vm = {};
        $scope.vm = vm;
        vm.programDocument = {};
        vm.statusList = [
            { value: 'Approached', text: 'Approached' },
            { value: 'Enrolled', text: 'Patient requested BPS' },
            { value: 'Declined', text: 'Declined' }
        ];
        vm.programMoniker = 'PS.BP',
        vm.programModelName = 'PSBloodPressureModel',
        vm.programModelText = 'Blood Pressure',

        vm.patientId = parseInt($stateParams.patientId),
        vm.isNew = ($stateParams.documentId === 'new'),
        vm.defaultStatus = vm.statusList[1];   
        vm.ProgramDocumentId = vm.isNew ? 0 : parseInt($stateParams.documentId);
        vm.PatientQualificationId = ($stateParams.patientQualificationId === '') ? 0 : parseInt($stateParams.patientQualificationId);

        vm.save = function save() {
            if ($scope.programForm.$invalid) {
                return;
            }

            $scope.$broadcast('saveBpMeasurements');
         
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
                    //var url = '/patient/' + vm.patientId + '/' + $stateParams.lastName + '/bloodGlucose/' + res.ProgramDocumentId + '/' + res.PatientQualificationId;
                    //$location.path(url);
                }
            });
        }

        vm.print = function print() {
            console.log("printing from vm");
            vm.save();
            programsCommon.logTimeLineEvent('Program Printed');
            //window.print();
        }

        vm.email = function email(){
            alert('Email case: ');
        }

        /******** Custom model functions ***********/

        function prepareDocument(programDocument) {

            var document = _.clone(programDocument, true);

            //remove hash key and etc from medications
            document.Actions.Action = JSON.parse(angular.toJson(document.Actions.Action));
            document.BloodPressureMeasurements.BloodPressureMeasurement = JSON.parse(angular.toJson(document.BloodPressureMeasurements.BloodPressureMeasurement));


            if (document.Actions.Action.length === 0) {
                document.Actions.Action = null;
            }

            if (document.BloodPressureMeasurements.BloodPressureMeasurement.length === 0) {
                document.BloodPressureMeasurements.BloodPressureMeasurement = null;
            }

            var programData = {};
            programData[vm.programModelName] = document;

            var stringXML = ('<?xml version="1.0"?>') + json2xml(programData);

            return stringXML;
        }

        function documentToModel(document) {

            document.BloodPressureMeasurements = programsCommon.convertGcArray(document.BloodPressureMeasurements, 'BloodPressureMeasurements');
            document.Actions = programsCommon.convertGcArray(document.Actions, 'Actions');
            
            return document;

        }

        // listen for the event in the relevant $scope
        $scope.$on('saveBpMeasurementsInternal', function (event, data) {
            $scope.$broadcast('saveRecommendationComment', data);
            vm.save();
        });

        /*******************/
        var callbacks = {
            prepareDocumentCallback: prepareDocument,
            documentToModelCallback: documentToModel
        }
        
        programsCommon.init(vm, callbacks);
        programsCommon.activate();

    });

});

