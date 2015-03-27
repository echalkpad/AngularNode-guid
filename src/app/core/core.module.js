define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-resource'
], function (ng, couchPotato) {
    'use strict';

    var module = ng.module('app.core', [
        'ui.router',
        'ngResource'
    ]);

    module.config(function ($stateProvider, $couchPotatoProvider) {

    });
    
    module.config(['$httpProvider', '$stateProvider', function ($httpProvider) {
        $httpProvider.interceptors.push('authInterceptorService');

       
    }]);

    module.constant('settings', {
        baseApiUrl: 'http://beta.guildcareservices.com.au/GuildCare.RestService/',
        socketUrl: 'http://117.53.165.141:8081',
        eGuildId: 87003,
        authorizationData: 'ODcwMDM6MDYxYjQ0NGYtNGYyMy00YTlmLWEzYzEtOWFkY2M0OTU2MjVkOkFFa1ZaM1IvY2pQdDUxbmd3djhaTzhQSVRUM2xWdGtheWJsTG9VZi9QTU44T2JRc2JMRThkSUV4RHVZdDZJOVNBbEVSekhkWnRFWXJndjlwSVFFcE80a3ZoMHMxMGlXSTNWSG5QT3Z5dHpFMm1jTHlMR3ROd1BxQU54VUxxNG5tNlNVRndpSDFmZWV0dTg1Y3RmWm0rbk1RU1A0WVhiMHJKMlJtK0V6cHlvND06UEFVTERFVjo=',
        idleDuration: 5 * 60, // in seconds
        warningDuration: 5, // in seconds
    });

    couchPotato.configureApp(module);

    module.run(function ($couchPotato, $rootScope, dataservice, $q, coreSocket, $filter) {
        module.lazy = $couchPotato;

        function activate() {
            var promises = [getPharmacylogo()];
            
            return $q.all(promises).then(function () {
                
            });
        }

        function getPharmacylogo() {
            return dataservice.getPharmacylogo().then(function (response) {

                $rootScope.pharmacylogo = 'data:image/png;base64,' + JSON.parse(response.data);
                return response.data;
            });
        }

        activate();

        coreSocket.init();
        coreSocket.addOnQualificationNotification(function (data) {

            var link = '';
            if (data.qualifications.length > 0) {
                var qualification = data.qualifications[0];
                link = '<a href="/#/patient/' + data.patient.patientId + '/' + $filter('programLink')(qualification.programMoniker) + '/new/' + qualification.patientQualificationId + '" class="btn btn-default">Create Case</a>';

                var timeLineEvent = {
                    PatientId: data.patient.patientId,
                    Detail: 'Program Invite',
                    EventDateTime: moment().toISOString(),
                    PatientQualificationId: qualification.patientQualificationId
                }
                dataservice.postTimeLineEvent(timeLineEvent).then(function (response) {
                    console.log('logTimeLineEvent: ' + response.data);
                });
            }

            $.smallBox({
                title: 'New Qualification',
                content: data.patient.firstName + ' ' + data.patient.lastName + ' <p class="text-align-right">' + link +'</p>',
                color: 'rgb(50, 118, 177)',
                icon: 'fa fa-bell swing animated'
            });
           
        });
        
    });

    return module;
});