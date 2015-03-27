define([
    'programs/common/filters/programs.common.filters.module'
],
    function (module) {

    'use strict';

    module.registerFilter('genderIcon', function () {
        return function (val) {
            switch (val) {
                case 'M':
                    return 'fa-male';
                case 'F':
                    return 'fa-female';
                default:
                    return 'fa-question';
            }
        };
    });

});