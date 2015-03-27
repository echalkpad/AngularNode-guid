define(['programs/inhalerTechnique/inhalerTechnique.module', 'lodash'], function (module, _) {

    'use strict';

    module.registerController('InhalerTechniqueController', function ($scope, $interval, $stateParams, $rootScope, dataservice, $q, programsCommon, $location) {
        var vm = {};
        $scope.vm = vm;
        vm.programDocument = {};
        vm.statusList = [
            { value: 'Approached', text: 'Approached' },
            { value: 'Completed', text: 'Check Conducted' },
            { value: 'Declined', text: 'Declined' }
        ];
        vm.programMoniker = 'PS.ASTHMA2012',
        vm.programModelName = 'PSAsthmaModel',
        vm.programModelText = 'Inhaler Technique',

        vm.patientId = parseInt($stateParams.patientId),
        vm.isNew = ($stateParams.documentId === 'new'),
        vm.defaultStatus = vm.statusList[1];
        vm.ProgramDocumentId = vm.isNew ? 0 : parseInt($stateParams.documentId);
        vm.PatientQualificationId = ($stateParams.patientQualificationId === '') ? 0 : parseInt($stateParams.patientQualificationId);

        vm.save = function save() {
            if ($scope.programForm.$invalid) {
                return;
            }

            $scope.$broadcast('saveAsthmaMedications');

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
                    //var url = '/patient/' + vm.patientId + '/' + $stateParams.lastName + '/inhalerTechnique/' + res.ProgramDocumentId + '/' + res.PatientQualificationId;
                    //$location.path(url);
                }
            });
        }

        vm.print = function print() {
            vm.save();
            programsCommon.logTimeLineEvent('Program Printed');
            window.print();
        }

        vm.email = function email() {
            alert('Email case: ');
        }



        /******** Custom model functions ***********/

        function prepareDocument(programDocument) {

            var document = _.clone(programDocument, true);

            //remove hash key and etc from medications
            document.AsthmaMedications.AsthmaMedication = JSON.parse(angular.toJson(document.AsthmaMedications.AsthmaMedication));

            var programData = {};
            programData[vm.programModelName] = document;

            var stringXML = ('<?xml version="1.0"?>') + json2xml(programData);

            return stringXML;
        }

        function documentToModel(document) {

            document.AsthmaMedications = programsCommon.convertGcArray(document.AsthmaMedications, 'AsthmaMedications');
            document.AsthmaAttributes['@InhalerType'] = document.AsthmaAttributes['@InhalerType'] || (document.AsthmaAttributes['@Spacer'] === 'true' ? 'Metered Dose WITH a spacer' : 'Metered Dose WITHOUT a spacer');

            return document;

        }

        vm.inhalerVisibility = {
             AccuhalerVisible: false,
             HandihalerVisible: false,
             WithSpacerVisible: false,
             WithoutSpacerVisible: false,
             InhalerPanelsVisibility: false
        };


        /*******************/

        var callbacks = {
            prepareDocumentCallback: prepareDocument,
            documentToModelCallback: documentToModel
        }

        programsCommon.init(vm, callbacks);
        programsCommon.activate();



    });

});

