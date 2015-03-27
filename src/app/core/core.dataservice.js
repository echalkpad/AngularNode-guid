define(['core/core.module'], function (core) {

    'use strict';

    core.registerFactory('dataservice', dataservice);

    function dataservice($http, $location, $q, settings) {
        var isPrimed = false;
        var primePromise;
        var baseUrl = settings.baseApiUrl;


        var service = {
            /************************/
            /* Patient      */
            /************************/
            getPatient: getPatient,
            postPatient: postPatient,
            putPatient: putPatient,
            /************************/
            /* Program      */
            /************************/
            getPrograms: getPrograms,
            /************************/
            /* PatientMeasurement      */
            /************************/
            getMeasurementHeartrate: getMeasurementHeartrate,
            getMeasurementBloodpressure: getMeasurementBloodpressure,
            /************************/
            /* Medication      */
            /************************/
            getMedications: getMedications,
            /************************/
            /* ProgramModel      */
            /************************/
            getProgramModel: getProgramModel,
            /************************/
            /* Pharmacy      */
            /************************/
            getPharmacy: getPharmacy,
            /************************/
            /* PharmacyLogo      */
            /************************/
            getPharmacylogo: getPharmacylogo,
            /************************/
            /* ProgramDocument      */
            /************************/
            getProgramDocument: getProgramDocument,
            postProgramDocument: postProgramDocument,
            getPatientPrograms: getPatientPrograms,
            /************************/
            /* patientQualification */
            /*********************** */
            postPatientQualification: postPatientQualification,
            getPatientQualifications: getPatientQualifications,
            getPatientQualificationsCount: getPatientQualificationsCount,
            getPatientQualification: getPatientQualification,
            updatePatientQualification: updatePatientQualification,
            /************************/
            /* PatientQualificationLite */
            /************************/
            getPatientQualificationLite: getPatientQualificationLite,
            /************************/
            /* Allergen */
            /************************/
            getAllergens: getAllergens,
            /************************/
            /* PatientAllergen */
            /************************/
            deletePatientAllergen: deletePatientAllergen,
            postPatientAllergen: postPatientAllergen,
            getPatientAllergens: getPatientAllergens,
            /************************/
            /* Condition */
            /************************/
            getConditions: getConditions,
            /************************/
            /* PatientCondition */
            /************************/
            deletePatientCondition: deletePatientCondition,
            postPatientCondition: postPatientCondition,
            getPatientConditions: getPatientConditions,
            /************************/
            /* SubscriptionStatus */
            /************************/
            /************************/
            getSubscriptionStatus: getSubscriptionStatus,
            /************************/
            /* Scripts */
            /************************/
            /************************/
            getScripts: getScripts,
            /************************/
            /* TimelineEvent */
            /************************/
            /************************/
            getTimeLineEvents: getTimeLineEvents,
            postTimeLineEvent: postTimeLineEvent,
            deleteTimeLineEvent: deleteTimeLineEvent,
            /************************/
            /* MemoCareTemplate */
            /************************/
            /************************/
            getMemoCareTemplates: getMemoCareTemplates,


            ready: ready
        };

        return service;
        
        function getPharmacy() {

            var url = baseUrl + 'pharmacy';
            return $http.get(url)
                .then(getPharmacyComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getPharmacyComplete(data, status, headers, config) {
                return data;
            }
        }

        function getMemoCareTemplates() {

            var url = baseUrl + 'memocaretemplates';
            return $http.get(url)
                .then(getMemoCareTemplatesComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getMemoCareTemplatesComplete(data, status, headers, config) {
                return data;
            }
        }
        
        function deleteTimeLineEvent(timelineEventId) {

            var url = baseUrl + 'timelineevent/' + timelineEventId;
            return $http.delete(url)
                .then(deleteTimeLineEventComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function deleteTimeLineEventComplete(data, status, headers, config) {
                return data;
            }
        }

        function postTimeLineEvent(timelineEvent) {

            var url = baseUrl + 'timelineevent';
            return $http.post(url, timelineEvent)
                .then(postTimeLineEventComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function postTimeLineEventComplete(data, status, headers, config) {
                return data;
            }
        }

        function getTimeLineEvents(patientId, userId, from, to, offset, limit) {

            var url = baseUrl + 'timelineevents';
            return $http.get(url, {
                params: {
                    patientId: patientId,
                    userId: userId,
                    from: from,
                    to: to,
                    offset: offset,
                    limit: limit || 20
                }})
                .then(getTimeLineEventsComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getTimeLineEventsComplete(response, status, headers, config) {
                return response.data;
            }
        }


        function getScripts(patientId) {

            var url = baseUrl + 'scripts/' + patientId;
            return $http.get(url)
                .then(getScriptsComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getScriptsComplete(response, status, headers, config) {
                return response.data;
            }
        }

        function getSubscriptionStatus() {

            var url = baseUrl + 'subscriptionstatus';
            return $http.get(url)
                .then(getSubscriptionStatusComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getSubscriptionStatusComplete(data, status, headers, config) {
                return data;
            }
        }

        function deletePatientCondition(patientConditionId) {

            var url = baseUrl + 'patientCondition/' + patientConditionId;
            return $http.delete(url)
                .then(deletePatientConditionComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function deletePatientConditionComplete(data, status, headers, config) {
                return data;
            }
        }

        function postPatientCondition(patientId, conditionId) {

            var url = baseUrl + 'patientcondition';
            return $http.post(url, {
                PatientId: patientId,
                ConditionId: conditionId
            })
                .then(postPatientConditionComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function postPatientConditionComplete(data, status, headers, config) {
                return data;
            }
        }

        function getPatientConditions(patientId) {

            var url = baseUrl + 'patientconditions/' + patientId;
            return $http.get(url)
                .then(getPatientConditionsComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getPatientConditionsComplete(data, status, headers, config) {
                return data;
            }
        }

        function getConditions(conditionName) {

            var url = baseUrl + 'conditions?conditionName=%' + conditionName + '%';
            return $http.get(url)
                .then(getConditionsComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getConditionsComplete(response, status, headers, config) {
                return response.data;
            }
        }

        function deletePatientAllergen(patientAllergenId) {

            var url = baseUrl + 'patientallergen/' + patientAllergenId;
            return $http.delete(url)
                .then(deletePatientAllergenComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function deletePatientAllergenComplete(data, status, headers, config) {
                return data;
            }
        }

        function postPatientAllergen(patientId, allergenId) {

            var url = baseUrl + 'patientallergen';
            return $http.post(url, {
                PatientId: patientId,
                AllergenId: allergenId
            })
                .then(postPatientAllergenComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function postPatientAllergenComplete(data, status, headers, config) {
                return data;
            }
        }

        function getPatientAllergens(patientId) {

            var url = baseUrl + 'patientallergens/' + patientId;
            return $http.get(url)
                .then(getPatientAllergensComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getPatientAllergensComplete(data, status, headers, config) {
                return data;
            }
        }

        function getAllergens(allergenText) {

            var url = baseUrl + 'allergens/' + allergenText;
            return $http.get(url)
                .then(getAllergensComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getAllergensComplete(response, status, headers, config) {
                return response.data;
            }
        }

        function getMeasurementHeartrate(patientId, limit) {

            var url = baseUrl + 'measurement/heartrate/' + patientId + '/' + limit;
            return $http.get(url)
                .then(getMeasurementHeartrateComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getMeasurementHeartrateComplete(data, status, headers, config) {
                return data;
            }
        }

        function getMeasurementBloodpressure(patientId, limit) {

            var url = baseUrl + 'measurement/bloodpressure/' + patientId + '/' + limit;
            return $http.get(url)
                .then(getMeasurementBloodpressureComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getMeasurementBloodpressureComplete(data, status, headers, config) {
                return data;
            }
        }

        function postPatient(patient) {
            var url = baseUrl + 'patient?';
            url += $.param(patient);
            return $http.post(url)
                .then(postPatientComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function postPatientComplete(response, status, headers, config) {
                return response.data;
            }
        }


        function putPatient(patient) {
            var url = baseUrl + 'patient/' + patient.PatientId;

            return $http.put(url, patient)
                .then(putPatientComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function putPatientComplete(response, status, headers, config) {
                return response.data;
            }
        }

        function getProgramDocument(programDocumentId) {

            var url = baseUrl + 'programdocument/' + programDocumentId;
            return $http.get(url)
                .then(getProgramDocumentComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getProgramDocumentComplete(data, status, headers, config) {
                return data.data;
            }
        }

        function getPharmacylogo() {

            var url = baseUrl + 'pharmacylogo';
            return $http.get(url)
                .then(getPharmacylogoComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getPharmacylogoComplete(data, status, headers, config) {
                return data;
            }
        }

        function getPrograms() {

            var url = baseUrl + 'programs';
            return $http.get(url)
                .then(getProgramsComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getProgramsComplete(data, status, headers, config) {
                return data;
            }
        }

        function getMedications(patientId) {

            var url = baseUrl + 'medications/' + patientId;

            return $http.get(url)
                .then(getMedicationsComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getMedicationsComplete(data, status, headers, config) {
                return data;
            }
        }

        function postProgramDocument(programDocumentId, programData, patientQualification, programDocumentAttributes) {

            var url = baseUrl + 'programdocument';
            var data = {
                ProgramDocument: {
                    ProgramData: programData,
                    ProgramDocumentId: programDocumentId
                },
                PatientQualification: patientQualification,
                ProgramDocumentAttributes: programDocumentAttributes || []
            };
            return $http.post(url, data)
                .then(postProgramDocumentComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function postProgramDocumentComplete(data, status, headers, config) {
                return data;
            }
        }



        function postPatientQualification(data) {
            s
            var url = baseUrl + 'patientqualification';
            return $http.post(url, data)
                .then(postPatientQualificationComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function postPatientQualificationComplete(data, status, headers, config) {
                return data;
            }
        }

        function updatePatientQualification(patientQualificationId, qualificationStatus, qualificationValue, programDocumentId) {
            var url = baseUrl + 'patientQualification/' + patientQualificationId;
            return $http({
                method: 'PATCH', url: url,
                params: {
                    qualificationStatus: qualificationStatus,
                    qualificationValue: qualificationValue,
                    programDocumentId: programDocumentId
                }
            })
                 .then(updatePatientQualificationComplete)
                 .catch(function (message) {
                     $location.url('/');
                 });

            function updatePatientQualificationComplete(data, status, headers, config) {
                return data;
            }
        }




        function getProgramModel(programName, patientId) {
            var url = baseUrl + 'programmodel/' + programName + '/' + patientId;
            return $http.get(url)
                .then(getProgramsComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getProgramsComplete(data, status, headers, config) {
                data = JSON.parse(JSON.parse(data.data));
                return data;
            }
        }

        function getPatientQualificationLite(firstName, lastName, lastDispenseDate, qualificationStatus, programId, sortField, sortOrder, offset, limit) {

            var url = baseUrl + 'patientqualificationlite';
            return $http.get(url, {
                params: {
                    firstName: firstName,
                    lastName: lastName,
                    lastDispenseDate: lastDispenseDate,
                    qualificationStatus: qualificationStatus,
                    programId: programId,
                    sortField: sortField,
                    sortOrder: sortOrder || 'asc',
                    offset: offset || 0,
                    limit: limit || 25
                }
            })
                .then(getPatientQualificationLiteComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getPatientQualificationLiteComplete(data, status, headers, config) {
                return data;
            }
        }

        function getPatientPrograms(patientId, searchKey, searchValue, sortOrder, offset, limit) {
            //programdocuments/{patientId}?searchKey={searchKey}&searchValue={searchValue}&sortOrder={sortOrder}&offset={offset}&limit={limit}
            var url = baseUrl + 'programdocuments/' + patientId;
            return $http.get(url, {
                params: {
                    searchKey: searchKey,
                    searchValue: searchValue,
                    sortOrder: sortOrder || 'asc',
                    offset: offset || 0,
                    limit: limit || 25
                }
            })
                .then(getPatientComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getPatientComplete(data, status, headers, config) {
                return data;
            }
        }

        function getPatient(patientId) {
            var url = baseUrl + 'patient/' + patientId;
            return $http.get(url)
                .then(getPatientComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getPatientComplete(data, status, headers, config) {
                return data;
            }
        }

        function getPatientQualifications(patientId, from, includeStatus, excludeStatus) {
            var url = baseUrl + 'patientqualifications';
            return $http.get(url, {
                params: {
                    patientId: patientId,
                    from: from,
                    includeStatus: includeStatus,
                    excludeStatus: excludeStatus
                }
            })
                .then(getPatientQualificationsComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getPatientQualificationsComplete(data, status, headers, config) {
                return data;
            }
        }

        function getPatientQualificationsCount(patientId, from, includeStatus, excludeStatus) {
            var url = baseUrl + 'patientqualifications/count';
            return $http.get(url, {
                params: {
                    patientId: patientId,
                    from: from,
                    includeStatus: includeStatus,
                    excludeStatus: excludeStatus
                }
            })
                .then(getPatientQualificationsCountComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getPatientQualificationsCountComplete(response, status, headers, config) {
                return response.data;
            }
        }

        function getPatientQualification(patientQualificationId) {
            var url = baseUrl + 'patientqualification/' + patientQualificationId;
            return $http.get(url)
                .then(getPatientQualificationComplete)
                .catch(function (message) {
                    $location.url('/');
                });

            function getPatientQualificationComplete(data, status, headers, config) {
                return data;
            }
        }



        function prime() {
            // This function can only be called once.
            if (primePromise) {
                return primePromise;
            }

            primePromise = $q.when(true).then(success);
            return primePromise;

            function success() {
                isPrimed = true;
                logger.info('Primed data');
            }
        }

        function ready(nextPromises) {
            var readyPromise = primePromise || prime();

            return readyPromise
                .then(function () { return $q.all(nextPromises); })
                .catch(exception.catcher('"ready" function failed'));
        }


    }

});