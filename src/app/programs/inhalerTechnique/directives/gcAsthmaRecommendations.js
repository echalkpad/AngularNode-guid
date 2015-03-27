define(['../inhalerTechnique.module'], function (module) {

    'use strict';

    module.registerDirective('gcAsthmaRecommendations', gcAsthmaRecommendations);

    function gcAsthmaRecommendations() {

        console.log('Creating gcAsthmaRecommendations directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                commentsActions: '=',
                qualifiesIntervention: '=',
                asthmaAttributes: '=',
                name: '@'
            },
            templateUrl: 'app/programs/inhalerTechnique/directives/templates/gcAsthmaRecommendations.html'
        };

        function link(scope, element, attrs) {
            scope.recommendationsList = [
                { Name: 'RecommendActionPlan', DisplayName: 'Refer to prescriber for Asthma Action Plan' },
                { Name: 'RecommendSpacer', DisplayName: 'Spacer' },
                { Name: 'RecommendGPPreventer', DisplayName: 'Refer to prescriber to consider preventer medication' },
                { Name: 'RecommendReportToGP', DisplayName: 'Report sent to GP (Patient consented)' },
                { Name: 'RecommendAdherence', DisplayName: 'Medicines Adherence program' },
                { Name: 'RecommendMedsCheck', DisplayName: 'MedsCheck' },
                { Name: 'RecommendHMR', DisplayName: 'Home Medicine Review' },
                { Name: 'RecommendCessation', DisplayName: 'Smoking cessation' }
            ];
            scope.selectedRecommendations = {};
            
            scope.$watch('asthmaAttributes', function () {
                if (!scope.asthmaAttributes) { return; }

                var selected = [];
                for (var asthmaAttribute in scope.asthmaAttributes) {
                    var selectedRec = _.find(scope.recommendationsList, function (item) { return ('@' + item.Name) === asthmaAttribute });
                    if (selectedRec && scope.asthmaAttributes[asthmaAttribute] === 'true') {
                        selected.push(selectedRec);
                    }
                }
                scope.selectedRecommendations.selected = selected;
                
            });

            scope.$watch('selectedRecommendations.selected', function () {
                if (scope.selectedRecommendations.selected && scope.asthmaAttributes) {
                    scope.recommendationsList.forEach(function (recommendation) {
                        for (var asthmaAttribute in scope.asthmaAttributes) {
                            var name = asthmaAttribute.substring(1, (asthmaAttribute.length));
                            var selectedRec = _.find(scope.selectedRecommendations.selected, function (item) { return item.Name === name }),
                                existRec = _.find(scope.recommendationsList, function (item) { return item.Name === name });;
                            
                            if (existRec) {
                                scope.asthmaAttributes[asthmaAttribute] = (selectedRec) ? 'true' : 'false';
                            }
                        }
                    });
                }

            });

        };

        return directive;
    }

});