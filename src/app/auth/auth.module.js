define([
    'angular',
    'angular-couch-potato',
    'angular-ui-router',
    'angular-google-plus',
    'angular-easyfb',
    'angular-idle'
], function (ng, couchPotato) {

    'use strict';

    var module = ng.module('app.auth', [
        'ui.router',
        'ngIdle'
    ]);

    couchPotato.configureApp(module);

    module.config(function ($stateProvider, $couchPotatoProvider, $keepaliveProvider, $idleProvider, settings) {

        $stateProvider
            .state('login', {
                url: '/login',
                views: {
                    root: {
                        templateUrl: 'app/auth/views/login.html'
                    }
                },
                data: {
                    title: 'Login',
                    htmlId: 'extr-page'
                },
                resolve: {
                    deps: $couchPotatoProvider.resolveDependencies([
                        'modules/forms/directives/validate/smartValidateForm',
                        'auth/login/LoginCtrl',
                        'auth/login/directives/facebookSignin',
                        'auth/login/directives/googleSignin'
                    ])
                }
            })
            .state('register', {
                url: '/register',
                views: {
                    root: {
                        templateUrl: 'app/auth/views/register.html'
                    }
                },
                data: {
                    title: 'Register',
                    htmlId: 'extr-page'
                },
                resolve: {
                    deps: $couchPotatoProvider.resolveDependencies([
                        'modules/forms/directives/validate/smartValidateForm'
                    ])
                }
            })
            .state('forgotPassword', {
                url: '/forgot-password',
                views: {
                    root: {
                        templateUrl: 'app/auth/views/forgot-password.html'
                    }
                },
                data: {
                    title: 'Forgot Password',
                    htmlId: 'extr-page'
                },
                resolve: {
                    deps: $couchPotatoProvider.resolveDependencies([
                        'modules/forms/directives/validate/smartValidateForm'
                    ])
                }
            })
            .state('lock', {
                url: '/lock',
                views: {
                    root: {
                        templateUrl: 'app/auth/views/lock.html'
                    }
                },
                data: {
                    title: 'Locked Screen',
                    htmlId: 'lock-page'
                }
            });

        $idleProvider.idleDuration(settings.idleDuration);
        $idleProvider.warningDuration(settings.warningDuration);
    });

    module.run(function ($couchPotato, $idle, $rootScope, $state) {
        module.lazy = $couchPotato;

        function closeWarning() {
            $("#MsgBoxBack").removeClass("fadeIn").addClass("fadeOut").delay(300).queue(function () {
                $(this).remove();
                ExistMsg = 0; SmartMSGboxCount = 0; PrevTop = 0;
            });
        }
        
        $rootScope.$on('$idleStart', function () {
            if ($state.$current.name === 'lock') {
                return;
            }

            $.SmartMessageBox({
                title: '<i class="fa fa-warning" style="color:#dfb56c"></i> Warning! You\'ll be logged out in <span id="countDownTimer"></span> second(s).',
                content: ' Do Something to cancel log out!',
                buttons: '[OK]'
            });
        });

        
        
        $rootScope.$on('$idleWarn', function (e, countdown) {
            // follows after the IdleStart event, but includes a countdown until the user is considered timed out
            // the countdown arg is the number of seconds remaining until then.
            // you can change the title or display a warning dialog from here.
            // you can let them resume their session by calling Idle.watch()
            $('#countDownTimer').text(countdown);


        });

        $rootScope.$on('$idleTimeout', function () {
            // the user has timed out (meaning idleDuration + timeout has passed without any activity)
            // this is where you'd log them
            if ($state.$current.name === 'lock') {
                return;
            }

            closeWarning();
            $state.go('lock'); 
        });

        $rootScope.$on('$idleEnd', function () {
            // the user has come back from AFK and is doing stuff. if you are warning them, you can use this to hide the dialog
            closeWarning();
        });


        $idle.watch();
    });
    return module;
});