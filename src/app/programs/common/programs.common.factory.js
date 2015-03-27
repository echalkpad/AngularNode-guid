define(['./programs.common.module'], function (common) {

    'use strict';

    common.registerFactory('programsCommon', programsCommon);

    function programsCommon($rootScope, dataservice, $q) {

        var vm = {},
            callbacks = {};
        
        var service = {
            postProgramDocument: postProgramDocument,
            getMedications: getMedications,
            getProgramModel: getProgramModel,
            getProgramDocument: getProgramDocument,
            getPatientQualification: getPatientQualification,
            getPrograms: getPrograms,

            convertGcArray: convertGcArray,
            logTimeLineEvent: logTimeLineEvent,

            init: init,

            activate: activate
        };

        return service;

        function activate() {
            $rootScope.loading = true;

            var promises = [];
            if (vm.isNew) {
                promises.push(getProgramModel(vm.programMoniker, vm.patientId));
            } else {
                promises.push(getProgramDocument(vm.ProgramDocumentId));
                promises.push(getPatientQualification(vm.PatientQualificationId));
            }
            promises.push(getMedications(vm.patientId));
            promises.push(getPrograms());

            return $q.all(promises).then(function () {
                console.log('Activated Common ' + vm.programModelText + ' program View');
            });
        }

        function init(viewModel, callbackFunctions) {
            vm = viewModel;
            callbacks = callbackFunctions;
        }

        function postProgramDocument(programDocument, status) {

            var programId = parseInt(_.find(vm.programs, function (item) { return item.ProgramMoniker === vm.programMoniker; }).ProgramId),
                programData = callbacks.prepareDocumentCallback(programDocument),
                patientQualification = {
                    PatientQualificationId: vm.PatientQualificationId,
                    PatientId: vm.patientId,
                    ProgramId: parseInt(programId),
                    QualificationStatus: status.value,
                    QualificationValue: status.text
                };

            return dataservice.postProgramDocument(vm.ProgramDocumentId, programData, patientQualification).then(function (response) {

                console.log('postProgramDocument=' + JSON.stringify(response.data));

                vm.ProgramDocumentId = response.data.ProgramDocumentId;
                vm.PatientQualificationId = response.data.PatientQualificationId;

                logTimeLineEvent(vm.isNew ? 'Program Created' : 'Program Updated');

                return response.data;
            });
        }


        function logTimeLineEvent(detail) {
            if (vm.PatientQualificationId && vm.ProgramDocumentId) {
                var timeLineEvent = {
                    PatientId: vm.patientId,
                    Detail: detail,
                    EventDateTime: moment().toISOString(),
                    PatientQualificationId: vm.PatientQualificationId,
                    ProgramDocumentId: vm.ProgramDocumentId
                }
                dataservice.postTimeLineEvent(timeLineEvent).then(function (response) {
                    console.log('logTimeLineEvent: ' + response.data);
                });
            }
            
        }

        function getMedications(patientId) {
            return dataservice.getMedications(patientId).then(function (response) {
                vm.medications = response.data;
                return vm.medications;
            });
        }

        function getProgramModel(programName, patientId) {
            return dataservice.getProgramModel(programName, patientId).then(function (response) {
                var document = response;
                vm.document = document[vm.programModelName];
                vm.document = callbacks.documentToModelCallback(vm.document);

                vm.caseStatus = vm.defaultStatus;

                $rootScope.loading = false;
                return vm.document;
            });
        }

        function getProgramDocument(programDocumentId) {
            return dataservice.getProgramDocument(programDocumentId).then(function (response) {

                vm.CreatedDate = response.CreatedDate;
                vm.UpdatedDate = response.UpdatedDate;
                vm.document = JSON.parse(response.ProgramData)[vm.programModelName];

                vm.document = callbacks.documentToModelCallback(vm.document);

                $rootScope.loading = false;

                return vm.document;
            });
        }

        function getPatientQualification(patientQualificationId) {
            return dataservice.getPatientQualification(patientQualificationId).then(function (response) {

                vm.caseStatus = _.find(vm.statusList, function (item) { return item.value === response.data.QualificationStatus }) || vm.defaultStatus;

                return response.data;
            });
        }

        function getPrograms() {

            return dataservice.getPrograms().then(function (response) {
                vm.programs = response.data;
                return vm.programs;
            });
        }

        function convertGcArray(value, name, subName) {
            value = value || {};
            subName = subName || name.substr(0, name.length - 1);

            if (value[subName]) {
                value[subName] = _.isArray(value[subName]) ? value[subName] : [value[subName]];
            } else {
                value[subName] = [];
            }

            return value;
        }

    }

});