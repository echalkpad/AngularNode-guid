define(['../bloodGlucose.module'], function (module) {

    'use strict';

    module.registerDirective('gcBglPatientProfile', gcBglPatientProfile);

    function gcBglPatientProfile() {

        console.log('Creating gcBglPatientProfile directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                bglMedications: '=',
                medicationsList: '=',
                bglAttributes: '=',
                patientHistory: '=',
                name: '@'
            },
            templateUrl: 'app/programs/bloodGlucose/directives/templates/gcBglPatientProfile.html'
        };

        function link(scope, element, attrs) {
            
            scope.diabetesTypeList = ['Type 1 Diabetes', 'Type 2 Diabetes', 'Gestational', 'Screening Only', 'Other'];
            
            scope.BGLMedicationList = [];

            function arrayUnique(array, comparer) {
                var a = array.concat();
                for (var i = 0; i < a.length; ++i) {
                    for (var j = i + 1; j < a.length; ++j) {
                        if (comparer(a[i],a[j]))
                            a.splice(j--, 1);
                    }
                }

                return a;
            };


            var mergeArrays = function() {
                if (scope.bglMedications && scope.medicationsList) {

                    scope.medicationsList = _.map(scope.medicationsList, function(item) {
                        item['@FullDrugName'] = item.FullDrugName;
                        item['@GenericName'] = item.GenericName;
                        item['@Selected'] = 'false';
                        
                        delete item.FullDrugName;
                        delete item.GenericName;
                        
                        return item;
                    });
                    // Merges both arrays and gets unique items
                    scope.BGLMedicationList = arrayUnique(scope.bglMedications.concat(scope.medicationsList), function(a, b) {
                        return a['@FullDrugName'] === b['@FullDrugName'];
                    });
                    scope.bglMedications = scope.BGLMedicationList;
                }
            };

            //scope.BGLMedications = { selected: [] };
            var loadMedications = scope.$watch('medicationsList', function(newValue) {
                if (!newValue) return;

                mergeArrays();
                //un bind
                loadMedications();
            });

            var loadBGLMedications = scope.$watch('bglMedications', function (newValue) {
                if (!newValue) return;

                mergeArrays();
                //un bind
                loadBGLMedications();
            });

            scope.selectedChanged = function() {
                var changedMedication = this.medication,
                    fullDrugName = changedMedication.FullDrugName || changedMedication['@FullDrugName'],
                    medication = _.find(scope.bglMedications, function (item) { return item['@FullDrugName'] === fullDrugName });

                medication['@Selected'] = changedMedication['@Selected'];
            }

            scope.$watch('bglAttributes["@DiabetesType"]', function (newValue) {
                
                if (newValue === 'Type 1 Diabetes') {
                    scope.bglAttributes['@InsulinUser'] = 'true';
                }
                    
            });
            
            
            console.log('gcBglPatientProfile link....');

        };

        return directive;
    }

});