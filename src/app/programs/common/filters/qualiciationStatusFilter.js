define([
    'programs/common/filters/programs.common.filters.module'
],
    function (module) {

    'use strict';

    module.registerFilter('qualiciationStatus', function () {

        return function (val) {
            switch (val) {
                case 'Declined':
                    return 'label-danger';
                case 'Approached':
                case 'Incomplete':
                    return 'label-warning';
                case 'Completed':
                case 'Enrolled':
                    return 'label-success';
                case 'Invite':
                    return 'label-info';
                default:
                    return 'label-default';
                    
            }
        };
    });

});