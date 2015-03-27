define([
    'programs/common/filters/programs.common.filters.module'
],
    function (module) {

    'use strict';

    module.registerFilter('gender', function () {
        return function (val) {
            switch (val){
                case 'M':
                    return 'Male';
                case 'F':
                    return 'Female';
                default:
                    return 'Unknown';
            }
        };
    });

});