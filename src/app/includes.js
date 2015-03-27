define([
    // account
    'auth/auth.module',
    'auth/models/User',

    // layout
    '../vendor/smartadmin/app/layout/module',
    '../vendor/smartadmin/app/layout/actions/minifyMenu',
    '../vendor/smartadmin/app/layout/actions/toggleMenu',
    '../vendor/smartadmin/app/layout/actions/fullScreen',
    '../vendor/smartadmin/app/layout/actions/resetWidgets',
    '../vendor/smartadmin/app/layout/actions/resetWidgets',
    '../vendor/smartadmin/app/layout/actions/searchMobile',
    //'../vendor/smartadmin/app/layout/directives/demo/demoStates',
    '../vendor/smartadmin/app/layout/directives/smartInclude',
    '../vendor/smartadmin/app/layout/directives/smartDeviceDetect',
    '../vendor/smartadmin/app/layout/directives/smartFastClick',
    '../vendor/smartadmin/app/layout/directives/smartLayout',
    //'../vendor/smartadmin/app/layout/directives/smartSpeech',
    '../vendor/smartadmin/app/layout/directives/smartRouterAnimationWrap',
    '../vendor/smartadmin/app/layout/directives/smartFitAppView',
    '../vendor/smartadmin/app/layout/directives/radioToggle',
    '../vendor/smartadmin/app/layout/directives/dismisser',
    '../vendor/smartadmin/app/layout/directives/smartMenu',
    '../vendor/smartadmin/app/layout/directives/bigBreadcrumbs',
    '../vendor/smartadmin/app/layout/directives/stateBreadcrumbs',
    '../vendor/smartadmin/app/layout/directives/smartPageTitle',
    '../vendor/smartadmin/app/layout/directives/hrefVoid',
    '../vendor/smartadmin/app/layout/service/SmartCss',
    '../vendor/smartadmin/app/modules/widgets/directives/widgetGrid',
    '../vendor/smartadmin/app/modules/widgets/directives/jarvisWidget',

    'layout/directives/demo/demoStates',

    //core
    'core/core.module',
    'core/core.dataservice',
    'core/core.socket',
    'core/core.authInterceptor',
    'programs/common/programs.common.module',

    'components/projects/Project',
    'components/projects/recentProjects',

    'components/activities/activities-controller',
    'components/activities/activities-dropdown-toggle-directive',
    'components/activities/activities-service',

    // dashboard
    'dashboard/dashboard.module',

    //reports
    'reports/reports.module',

    //services
    'services/services.module',

    //programs
    'programs/bloodPressure/bloodPressure.module',
    'programs/bloodGlucose/bloodGlucose.module',
    'programs/inhalerTechnique/inhalerTechnique.module',
    'programs/daa/daa.module',

    //programs/common
    'programs/common/programs.common.module',
    'programs/common/directives/gcProgramButton',
    'programs/common/filters/programs.common.filters.module',
    'programs/common/filters/qualiciationStatusFilter',
    'programs/common/filters/programLinkFilter',

    'calendar/calendar.module',
    'calendar/models/CalendarEvent',
    'calendar/directives/fullCalendar',
    'calendar/directives/dragableEvent',
    'calendar/controllers/CalendarCtrl',

    'inbox/inbox.module',
    'inbox/models/InboxConfig',
    'inbox/models/InboxMessage',

    'patient/patient.module',

    'modules/forms/module'
], function () {
    'use strict';
});
