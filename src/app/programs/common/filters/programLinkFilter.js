define([
    'programs/common/filters/programs.common.filters.module'
],
    function (module) {

    'use strict';

    module.registerFilter('programLink', function () {
        var supportedPrograms = {
            'PS.GLUCOSE2014': 'bloodGlucose',
            'PS.BP': 'bloodPressure',
            'PS.ASTHMA2012': 'inhalerTechnique',
            'PS.DAA': 'weeklyMedicines'
        };
        return function (val) {
            return val ? supportedPrograms[val] : '';
        };
    });

});