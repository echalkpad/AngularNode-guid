define(['core/core.module'], function (core) {
    'use strict';
    
    core.registerFactory('authInterceptorService', authInterceptorService);

    function authInterceptorService($q, $injector, $location, settings) {
        var authInterceptorServiceFactory = {};

        var _request = function (config) {

            config.headers = config.headers || {};
            //config.headers["Content-Type"] = 'application/json';
            //var authData = localStorageService.get('authorizationData') || settings.authorizationData;
            var authData = settings.authorizationData;
            if (authData) {
                config.headers.Authorization = 'Basic ' + authData;
            }

            return config;
        };

        var _responseError = function (rejection) {
            //if (rejection.status === 401) {
            //    //var authService = $injector.get('authService');
            //    //var authData = localStorageService.get('authorizationData');
            //    var authData = null;
                
            //    if (authData) {
            //        if (authData.useRefreshTokens) {
            //            $location.path('/refresh');
            //            return $q.reject(rejection);
            //        }
            //    }
            //    //authService.logOut();
            //    $location.path('/login');
            //}
            return $q.reject(rejection);
        };

        authInterceptorServiceFactory.request = _request;
        authInterceptorServiceFactory.responseError = _responseError;

        return authInterceptorServiceFactory;
    };
    
});
