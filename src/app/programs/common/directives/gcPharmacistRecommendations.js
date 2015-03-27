define(['../programs.common.module'], function (module) {

    'use strict';

    module.registerDirective('gcPharmacistRecommendations', gcPharmacistRecommendations);

    function gcPharmacistRecommendations() {

        console.log('Creating gcPharmacistRecommendations directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                recommendations: '=',
                pharmacist: '=',
                recommendationOtherDetail: '=',
                allowRecommendations: '@',
                actions: '=',
                disable: '=',
                showOther: '@',
                name: '@'
            },
            templateUrl: 'app/programs/common/directives/templates/gcPharmacistRecommendations.html'
        };

        function link(scope, element, attrs) {
            //@Name: "DoctorReferral"@Selected: "false"
            scope.recommendationsList = [];
            scope.selectedRecommendations = {};

            var recommendationHelper = {
                'DoctorReferral': { displayName: 'Health Care Professional Referral', group: 'Screening' },
                'ReportToDoctor': { displayName: 'Report to be sent to GP: Patient consented', group: 'Screening' },
                'LipidRecordingService': { displayName: 'Lipid Recording Service', group: 'Monitoring' },
                'WeeklyMedicinesPack': { displayName: 'Dose Aid Administration / Weekly Medicines Pack', group: 'Medications' },
                'BloodPressureMonitoring': { displayName: 'Blood Pressure Recording Service', group: 'Monitoring' },
                'HomeMedicinesReview': { displayName: 'MedsCheck/HMR', group: 'Medications' },
                'MedicinesAdherence': { displayName: 'Medicines Adherence Program', group: 'Screening' },
                'WeightRecord': { displayName: 'Weight Recording Service', group: 'Monitoring' }
            };

            scope.recommendationGroup = function(item) {
                return (item.Group ? item.Group : 'Other');
            }

            scope.$watch('recommendations', function () {
                //allowRecommendations
                var recommendations = (scope.allowRecommendations) ? _.filter(scope.recommendations, function (recommendation) { return scope.allowRecommendations.indexOf(recommendation['@Name']) >= 0; }) : scope.recommendations;
                scope.recommendationsList = _.map(recommendations, function (recommendation) {
                    //console.log(recommendation);
                    var description = recommendationHelper[recommendation['@Name']] || { displayName: recommendation['@Name'] };
                    return {
                        Name: recommendation['@Name'],
                        Selected: recommendation['@Selected'],
                        DisplayName: description.displayName,
                        Group: description.group
                    }   
                });

                scope.selectedRecommendations.selected = _.filter(scope.recommendationsList, function(rec) { return rec.Selected === 'true' });
            });

            scope.$watch('selectedRecommendations.selected', function () {
                if (scope.selectedRecommendations.selected && scope.recommendations) {
                    scope.recommendations.forEach(function (recommendation) {
                        var selectedRec = _.find(scope.selectedRecommendations.selected, function (item) { return item.Name === recommendation['@Name'] });
                        recommendation['@Selected'] = (selectedRec) ? 'true' : 'false';
                    });
                }

            });

            scope.$on('saveRecommendationComment', function (event, data) {
                console.log(data); // 'Data to send'
                if ((scope.pharmacist.Comments && scope.pharmacist.Comments !== '') && data) {
                    var action = {
                        '@RecordDate': data,
                        '@Comments': scope.pharmacist.Comments
                    };

                    scope.actions.push(action);
                }
            });

            
        };

        return directive;
    }

});