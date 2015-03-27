define(['core/core.module', 'socket-io'], function (core, io) {

	'use strict';

	core.registerFactory('coreSocket', coreSocket);

	function coreSocket(settings) {

		var socket = {},
			baseUrl = settings.socketUrl,
	        eGuildId = settings.eGuildId,
	        callbacks = {};
		
		var service = {
			init: init,
			addOnStatus: addOnStatus,
			addOnDispense: addOnDispense,
			addOnQualificationNotification: addOnQualificationNotification
		};

		return service;
		

		function init() {

			socket = io.connect(baseUrl);

			socket.emit('joinPharmacy', eGuildId);

			socket.on('status', function (msg) {
				console.log('OnStatus:' + msg);
				if (callbacks.OnStatus) {
					callbacks.OnStatus(msg);
				}
			});
			socket.on('dispense', function (msg) {
				console.log('OnDispense:' + msg);
				if (callbacks.OnDispense) {
					callbacks.OnDispense(msg);
				}
			});


			socket.on('qualification', function (patientQualificationsJson) {
				console.log('OnQualificationNotification:' + patientQualificationsJson);
				if (callbacks.OnQualificationNotification) {
				    callbacks.OnQualificationNotification(JSON.parse(patientQualificationsJson));
				}
			});
		};

	
		function addOnStatus(callback) {
			callbacks.OnStatus = callback;
		};

		function addOnDispense(callback) {
		    callbacks.OnDispense = callback;
		};
		function addOnQualificationNotification(callback) {
		    callbacks.OnQualificationNotification = callback;
		};
		
	


		
	}

});