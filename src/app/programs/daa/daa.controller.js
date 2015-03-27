define(['programs/daa/daa.module', 'lodash'], function (module, _) {

    'use strict';

    module.registerController('DaaController', function ($scope, $interval, dataservice, $q, $stateParams, $rootScope, programsCommon, $location) {
        var vm = {};
        $scope.vm = vm;
        vm.programDocument = {};
        vm.statusList = [
            { value: 'Approached', text: 'Approached' },
            { value: 'Enrolled', text: 'Patient requested DAA' },
            { value: 'Declined', text: 'Declined' }
        ];
        vm.programMoniker = 'PS.DAA',
        vm.programModelName = 'PSWeeklyMedicinesPackModel',
        vm.programModelText = 'Weekly Medicines Pack',

        vm.patientId = parseInt($stateParams.patientId),
        vm.isNew = ($stateParams.documentId === 'new'),
        vm.defaultStatus = vm.statusList[1];   
        vm.ProgramDocumentId = vm.isNew ? 0 : parseInt($stateParams.documentId);
        vm.PatientQualificationId = ($stateParams.patientQualificationId === '') ? 0 : parseInt($stateParams.patientQualificationId);

        var scriptLimit = 7;

        vm.save = function save() {
            if ($scope.programForm.$invalid) {
                return;
            }

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
            vm.save();
            programsCommon.logTimeLineEvent('Program Printed');
            window.print();
        }

        vm.email = function email(){
            alert('Email case: ');
        }

        /******** Custom model functions ***********/

        function prepareDocument(programDocument) {

            var document = _.clone(programDocument, true);
            
            document.Benefits = document.Benefits || null;
            document.PackableMedicines = document.PackableMedicines || '';

            var programData = {};
            programData[vm.programModelName] = document;

            var stringXML = ('<?xml version="1.0"?>') + json2xml(programData);

            return stringXML;
        }

        function documentToModel(document) {
            document.Benefits = document.Benefits || '';
            document.PackableMedicines = document.PackableMedicines || '';
            
            fillPackableMedicines();

            return document;
        };

        function fillPackableMedicines() {
            if (!vm.medications || !vm.document) {
                return;
            }
            var latestMeds = _.take(vm.medications, scriptLimit);
            vm.document.PackableMedicines = _.map(latestMeds, function (item) { return item.FullDrugName }).join(', ');
            if (vm.medications.length > scriptLimit) {
                vm.document.PackableMedicines += ' (only latest ' + scriptLimit + ' listed)';
            }

        }

        $scope.$watch('vm.medications', function (meds) {
            fillPackableMedicines();
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

