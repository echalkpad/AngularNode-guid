define(['../programs.common.module', 'programs/common/filters/programLinkFilter'], function (module) {

    'use strict';

    module.registerDirective('gcProgramButton', gcProgramButton);

    function gcProgramButton(dataservice, $filter) {

        console.log('Creating gcProgramButton directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                services: '=',
                qualification: '=',
                programClick: '=',
                hideDecline: '@',
                asLink: '@'
            },
            templateUrl: 'app/programs/common/directives/templates/gcProgramButton.html'
        };

        function link(scope, element, attrs) {
           

            var vm = {};

            var getProgramMoniker = function(programId) {
                if (programId) {
                    return _.find(scope.services, function (item) { return item.ProgramId === programId }).ProgramMoniker;
                }

                return '';
            };

            scope.$watchCollection('[qualification, services]', function (values) {
                if (values[0] && values[1]) {
                    scope.qualification.programIdLink = $filter('programLink')(getProgramMoniker(scope.qualification.ProgramId));
                }
            });

            scope.defaultClick = function() {
                if (scope.programClick) {
                    scope.programClick();
                }
            }

            scope.decline = function () {
                
                var programMoniker = getProgramMoniker(scope.qualification.ProgramId);
                getProgramModel(programMoniker, scope.qualification.PatientId).then(function (document) {
                    var programData = ('<?xml version="1.0"?>') + json2xml(document),
                        status = { value: 'Declined', text: 'Declined' };

                    postProgramDocument(scope.qualification, programData, status);
                });
            }

            function getProgramModel(programName, patientId) {
                return dataservice.getProgramModel(programName, patientId).then(function (response) {
                    return response;
                });
            }

            function postProgramDocument(qualification, programData, status) {
                
                var patientQualification = {
                        PatientQualificationId: qualification.PatientQualificationId,
                        PatientId: qualification.PatientId,
                        ProgramId: qualification.ProgramId,
                        QualificationStatus: status.value,
                        QualificationValue: status.text
                    };

                return dataservice.postProgramDocument(vm.ProgramDocumentId, programData, patientQualification).then(function (response) {

                    console.log('postProgramDocument=' + JSON.stringify(response.data));

                    qualification.ProgramDocumentId = response.data.ProgramDocumentId;
                    qualification.PatientQualificationId = response.data.PatientQualificationId;
                    qualification.QualificationStatus = patientQualification.QualificationStatus;
                    qualification.QualificationValue = patientQualification.QualificationValue;

                    logTimeLineEvent(qualification.PatientId, qualification.PatientQualificationId, qualification.ProgramDocumentId);

                    return response.data;
                });
            }

            function logTimeLineEvent(patientId, patientQualificationId, programDocumentId) {
                var timeLineEvent = {
                    PatientId: patientId,
                    Detail: 'Program Created',
                    EventDateTime: moment().toISOString(),
                    PatientQualificationId: patientQualificationId,
                    ProgramDocumentId: programDocumentId
                }
                dataservice.postTimeLineEvent(timeLineEvent).then(function (response) {
                    console.log('logTimeLineEvent: ' + response.data);
                });
            }
            
        };

        return directive;
    }
});