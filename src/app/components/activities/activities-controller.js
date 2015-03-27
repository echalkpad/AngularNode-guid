define(['app'], function (app) {
    'use strict';

    function ActivitiesCtrl($scope, $log, activityService, dataservice, $q) {

        var today = moment().utc(),
            maxQualifications = 10;
        
        $scope.activeTab = 'default';
        $scope.currentActivityItems = [];
        $scope.template_url = 'app/components/activities/tabs/tab-' + $scope.activeTab + '.html';
        $scope.totalActivities = null;
        $scope.qualificatios = null;

        var qualificationsLoaded = false;

        dataservice.getPatientQualificationsCount(null, today.startOf('day').toISOString()).then(function (count) {
            $scope.totalActivities = count;
            $scope.activities = {
                types: [
                    {
                        title: 'Msgs',
                        name: 'msgs',
                        length: 14
                    },
                    {
                        title: 'Qualifications',
                        name: 'qualifications',
                        length: count
                    }
                ]
            };
        });
        
        function getProgramName(programId) {
            return _.find($scope.services, function (s) { return s.ProgramId === programId }).ProgramName;
        }

        function getPatientName(patientId) {
            return dataservice.getPatient(patientId).then(function(patient) {
                return patient.firstName + ' ' + patient.LastName;
            });
        }

        $scope.isActive = function (tab) {
            return $scope.activeTab === tab;
        };

        $scope.closeDropdown = function () {
            $('.ajax-dropdown').fadeOut(150);
        }

        function getPatient(patientId) {
            return dataservice.getPatient(patientId).then(function (response) {
                return response.data;
            });
        }

        $scope.setTab = function (activityType) {
            $scope.loading = true;

            $scope.activeTab = activityType;
            $scope.currentActivityItems = [];
            $scope.template_url = 'app/components/activities/tabs/tab-' + activityType + '.html';
            $scope.activities.last_update = moment();

            switch (activityType) {
                case 'qualifications':
                    if (qualificationsLoaded) {
                        $scope.currentActivityItems = $scope.qualificatios;
                        $scope.loading = false;
                    } else {
                        dataservice.getPatientQualifications(null, today.startOf('day').toISOString()).then(function (response) {
                            qualificationsLoaded = true;
                            $scope.qualificatios = dataToModel(_.take(response.data, maxQualifications));
                            $scope.currentActivityItems = $scope.qualificatios;
                        });
                    }
                  
                    break;
                default:
                    activityService.getbytype(activityType, function (data) {
                        $scope.currentActivityItems = data.data;
                        $scope.loading = false;
                    });
                    break;
            }
        };

        $scope.refresh = function () {
            qualificationsLoaded = false;
            $scope.setTab($scope.activeTab);
        };

        function dataToModel(qulifications) {
            
            var patients = _.groupBy(qulifications, function (item) { return item.PatientId });
            var promises = [];
           
            if (qulifications.length !== 0) {
                _.forEach(patients, function(items) {
                    var patientId = items[0].PatientId;
                    promises.push(getPatient(patientId).then(function(patient) {
                        console.log('get patient: ' + patientId);
                        _.forEach(items, function(item) {
                            item.patientFullName = patient.FirstName + ' ' + patient.LastName;
                        });
                    }));
                    $q.all(promises).then(function() {
                        $scope.loading = false;
                    });
                });
                qulifications.forEach(function(qualification) {
                    qualification.programName = getProgramName(qualification.ProgramId);
                });
            } else {
                $scope.loading = false;
            }


            return qulifications;
        }

        function getPrograms() {
            return dataservice.getPrograms().then(function (response) {
                $scope.services = response.data;
                return $scope.services;
            });
        }

        getPrograms();
    }

    return app.controller('ActivitiesCtrl', ActivitiesCtrl);
   

});