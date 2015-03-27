define(['../patient.module'], function (module) {

    'use strict';

    module.registerDirective('gcTimeLine', gcTimeLine);

    function gcTimeLine(dataservice, $q) {

        console.log('Creating gcTimeLine directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                services: '=',
                patientId: '='
            },
            templateUrl: 'app/patient/directives/templates/gcTimeLine.html'
        };

        function link(scope, element, attrs) {
            var vm = {
                events: []
            };
            scope.firstLoadCount = 2;
            scope.vm = vm;

           
            scope.$watch('patientId', function(value) {
                if (value) {
                    getTimeLineEvents(scope.patientId, 0, scope.firstLoadCount);
                }
            });

            scope.loadMore = function() {
                getTimeLineEvents(scope.patientId, scope.firstLoadCount);
            }

            var getProgramName = function(programId){
                return scope.services.filter(function(s){ return s.ProgramId === programId })[0].ProgramName;
            }

            //{"Data":[{"TimelineEventId":598234,"PatientId":387513,"Detail":"Program Updated","WorkstationName":"PAULDEV","EventDateTime":"2015-02-19T12:13:26","UserId":null,"PatientQualificationId":739,"ProgramDocumentId":90230,"BookingId":null,"NoteId":null,"MemoCareMessageId":null,"MemoCareMessageResponseId":null,"PharmacyId":1}],"Total":1}
            function dataToModel(items) {
                items.forEach(function(item) {
                    if (item.PatientQualificationId) {
                        item.EventType = 'ProgramDocument';

                        getPatientQualification(item.PatientQualificationId).then(function (response) {
                            item.qualification = response.data;
                            item.ProgramName = getProgramName(item.qualification.ProgramId);
                        });
                    }
                });

                return items;
            }


            function getPatientQualification(patientQualificationId) {
                return dataservice.getPatientQualification(patientQualificationId).then(function (data) {
                    return data;
                });
            }

            function getTimeLineEvents(patientId, offset, limit) {
                return dataservice.getTimeLineEvents(patientId, null, null, null, offset, limit).then(function (data) {
                    vm.events = vm.events.concat(dataToModel(data.Data));
                    vm.eventsTotal = data.Total;
                    return vm.events;
                });
            }
        };

        module.registerFilter('programDetailIcon', function () {
            return function (val) {
                switch (val) {
                    case 'Program Created':
                        return 'fa-file-o';
                    case 'Program Updated':
                        return 'fa-pencil-square-o';
                    case 'Program Printed':
                        return 'fa-print';
                    default:
                        return 'fa-file-text-o';
                }
            };
        });
        

        return directive;



    }
});