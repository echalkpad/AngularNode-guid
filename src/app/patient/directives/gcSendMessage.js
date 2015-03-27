define(['../patient.module'], function (module) {

    'use strict';

    module.registerDirective('gcSendMessage', gcSendMessage);

    function gcSendMessage($modal, $state) {

        console.log('Creating gcSendMessage directive.');

        var directive = {
            link: link,
            restrict: 'A',
            scope: {
                messageChannel: '@',
                patient: '='
            }
        };

        function link(scope, element, attrs) {
            

            element.bind('click', function () {
                $modal.open({
                    templateUrl: 'app/patient/directives/templates/gcSendMessageModal.html',
                    controller: 'SendMessageController',
                    size: 'md',
                    resolve: {
                        patient: function () {
                            return scope.patient;
                        },
                        messageChannel: function() {
                            return scope.messageChannel;
                        }
                    }
                }).result.then(function (patient) {

                });
            });
        };

        return directive;
    }

    module.registerController('SendMessageController', function ($scope, $interval, $q, dataservice, $modalInstance, patient, messageChannel) {
        var vm = {
            message: {}
        };
        $scope.vm = vm;

        vm.message.mobile = patient.AltPhoneNumber;
        vm.message.email = patient.EmailAddress;

        if (!messageChannel) {
            vm.messageChannel = (patient.AltPhoneNumber) ? 'SMS' : 'EMAIL';
        } else {
            vm.messageChannel = messageChannel;
        }

        function activateTab(tab) {
            $scope.active = {}; //reset
            $scope.active[tab] = true;
        }
        activateTab(vm.messageChannel);
        

        function activate() {
            var promises = [getMemoCareTemplates(), getPharmacy()];
            return $q.all(promises).then(function () {
                console.log('Activated SendMessageController ');
            });
        }

        activate();

        $scope.insertTemplate = function () {
            if (vm.selectedTemplate) {
                vm.message.messageText = compileTemplate(vm.selectedTemplate.SingleText, patient, vm.pharmacy);
            }

        }

        $scope.reset = function () {
            vm.message.messageText = '';
        }

        $scope.sendMessage = function () {
            $modalInstance.close();
        };

        $scope.cancel = function () {
            $modalInstance.dismiss('cancel');
        };

        function compileTemplate(templateString, patient, pharmacy) {
            var text = templateString,
                replaceValues = [
                    { from: '<PTFN>', to: patient.FirstName },
                    { from: '<PTLN>', to: patient.LastName },
                    { from: '<PT>', to: patient.Gender === 'F' ? 'Mr' : 'Ms' },
                    { from: '<PHN>', to: pharmacy.Name }
                ];

            replaceValues.forEach(function (item) {
                text = text.replace(item.from, item.to);
            });

            return text;
        }

        function getMemoCareTemplates() {
            return dataservice.getMemoCareTemplates().then(function (response) {
                vm.templates = response.data;
                return vm.templates;
            });
        }

        function getPharmacy() {
            return dataservice.getPharmacy().then(function (response) {
                vm.pharmacy = response.data;
                return response.data;
            });
        }


    });

});