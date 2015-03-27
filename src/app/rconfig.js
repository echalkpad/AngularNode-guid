var require = {
    waitSeconds: 0,
    paths: {

        'jquery': [
            '//ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min',
            '../bower_components/jquery/dist/jquery.min'
        ],
        'jquery-ui': '//ajax.googleapis.com/ajax/libs/jqueryui/1.11.2/jquery-ui.min',

        'bootstrap': '//maxcdn.bootstrapcdn.com/bootstrap/3.2.0/js/bootstrap.min',

        'angular': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular.min',
        'angular-cookies': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-cookies.min',
        'angular-resource': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-resource.min',
        'angular-sanitize': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-sanitize.min',
        'angular-animate': '//ajax.googleapis.com/ajax/libs/angularjs/1.2.26/angular-animate.min',


        'domReady': '../bower_components/requirejs-domready/domReady',

        'angular-ui-router': '../bower_components/angular-ui-router/release/angular-ui-router.min',

        'angular-ui-utils': '../bower_components/angular-ui-utils/ui-utils.min',

        'angular-google-maps': '../bower_components/angular-google-maps/dist/angular-google-maps.min',

        'angular-bootstrap': '../bower_components/angular-bootstrap/ui-bootstrap-tpls.min',

        'angular-couch-potato': '../bower_components/angular-couch-potato/dist/angular-couch-potato',

        'angular-easyfb': '../bower_components/angular-easyfb/angular-easyfb.min',
        'angular-google-plus': '../bower_components/angular-google-plus/dist/angular-google-plus.min',

        'pace':'../bower_components/pace/pace.min',

        'fastclick': '../bower_components/fastclick/lib/fastclick',

        'jquery-color': '../bower_components/jquery-color/jquery.color',

        'select2': '../bower_components/select2/select2.min',

        'summernote': '../bower_components/summernote/dist/summernote.min',

        'he': '../bower_components/he/he',
        'to-markdown': '../bower_components/to-markdown/src/to-markdown',
        'markdown': '../bower_components/markdown/lib/markdown',
        'bootstrap-markdown': '../bower_components/bootstrap-markdown/js/bootstrap-markdown',

        'ckeditor': '../bower_components/ckeditor/ckeditor',

        'moment': '../bower_components/moment/min/moment-with-locales.min',
        'moment-timezone': '../bower_components/moment-timezone/moment-timezone',

        'sparkline': '../bower_components/relayfoods-jquery.sparkline/dist/jquery.sparkline.min',
        'easy-pie': '../bower_components/jquery.easy-pie-chart/dist/jquery.easypiechart.min',

        'flot': '../bower_components/flot/jquery.flot.cust.min',
        'flot-resize': '../bower_components/flot/jquery.flot.resize.min',
        'flot-fillbetween': '../bower_components/flot/jquery.flot.fillbetween.min',
        'flot-orderBar': '../bower_components/flot/jquery.flot.orderBar.min',
        'flot-pie': '../bower_components/flot/jquery.flot.pie.min',
        'flot-time': '../bower_components/flot/jquery.flot.time.min',
        'flot-tooltip': '../bower_components/flot/jquery.flot.tooltip.min',

        'raphael': '../bower_components/morris/raphael.min',
        'morris': '../bower_components/morris/morris.min',

        'dygraphs': '../bower_components/dygraphs/dygraph-combined.min',
        'dygraphs-demo': '../bower_components/dygraphs/demo-data.min',

        'chartjs': '../bower_components/chartjs/Chart.min',

        'datatables': '../bower_components/datatables/media/js/jquery.dataTables.min',
        'datatables-bootstrap': '../bower_components/datatables-plugins/integration/bootstrap/3/dataTables.bootstrap',
        'datatables-tools': '../bower_components/datatables-tabletools/js/dataTables.tableTools',
        'datatables-colvis': '../bower_components/datatables-colvis/js/dataTables.colVis',
        'datatables-responsive': '../bower_components/datatables-responsive/files/1.10/js/datatables.responsive',


        'jqgrid':'../bower_components/jqgrid/js/minified/jquery.jqGrid.min',
        'jqgrid-locale-en':'../bower_components/jqgrid/js/i18n/grid.locale-en',


        'jquery-maskedinput': '../bower_components/jquery-maskedinput/dist/jquery.maskedinput.min',
        'jquery-validation': '../bower_components/jquery-validation/dist/jquery.validate.min',
        'jquery-form': '../bower_components/jquery-form/jquery.form',

        'bootstrap-validator': '../bower_components/bootstrapvalidator/dist/js/bootstrapValidator.min',

        'bootstrap-timepicker': '../bower_components/bootstrap3-fontawesome-timepicker/js/bootstrap-timepicker.min',
        'clockpicker': '../bower_components/clockpicker/dist/bootstrap-clockpicker.min',
        'nouislider': '../bower_components/nouislider/distribute/jquery.nouislider.min',
        'ionslider': '../bower_components/ion.rangeSlider/js/ion.rangeSlider.min',
        'bootstrap-duallistbox': '../bower_components/bootstrap-duallistbox/dist/jquery.bootstrap-duallistbox.min',
        'bootstrap-colorpicker': '../bower_components/bootstrap-colorpicker/js/bootstrap-colorpicker',
        'jquery-knob': '../bower_components/jquery-knob/dist/jquery.knob.min',
        'bootstrap-slider': '../bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min',
        'bootstrap-tagsinput': '../bower_components/bootstrap-tagsinput/dist/bootstrap-tagsinput.min',
        'x-editable': '../bower_components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable.min',
        // 'angular-x-editable': '../bower_components/angular-xeditable/dist/js/xeditable.min',

        'fuelux-wizard': '../bower_components/fuelux/js/wizard',

        'dropzone': '../bower_components/dropzone/downloads/dropzone.min',

        'jcrop': '../bower_components/jcrop/js/jquery.Jcrop.min',


        'bootstrap-progressbar': '../bower_components/bootstrap-progressbar/bootstrap-progressbar.min',
        'jquery-nestable': '../bower_components/jquery-nestable/jquery.nestable',

        'superbox': '../bower_components/superbox/superbox.min',


        'jquery-jvectormap': '../bower_components/vectormap/jquery-jvectormap-1.2.2.min',
        'jquery-jvectormap-world-mill-en': '../bower_components/vectormap/jquery-jvectormap-world-mill-en',


        'lodash': '../bower_components/lodash/dist/lodash.min',


        'magnific-popup': '../bower_components/magnific-popup/dist/jquery.magnific-popup',

        'fullcalendar': '../vendor/smartadmin/smartadmin-plugin/fullcalendar/jquery.fullcalendar.min',
        'smartwidgets': '../vendor/smartadmin/smartadmin-plugin/smartwidgets/jarvis.widget.min',
        'notification': '../vendor/smartadmin/smartadmin-plugin/notification/SmartNotification.min',
        
        'xml2json': '../vendor/xml2json',
        'xmlToJSON2': '../vendor/xmlToJSON2',

        // app js file includes
        'modules-includes': 'includes',

        'modules/widgets/module': '../vendor/smartadmin/app/modules/widgets/module',
        'modules': '../vendor/smartadmin/app/modules',       

        'angular-ui-select': '../bower_components/angular-ui-select/dist/select',
        'json2xml': '../vendor/json2xml',
        'ng-tags-input': '../bower_components/ng-tags-input/ng-tags-input.min',
        //'socket.io': '../bower_components/socket.io-client/socket.io'
        'socket-io': '../vendor/socket.io-1.1.0',
        'kendo': 'http://cdn.kendostatic.com/2014.3.1316/js/kendo.all.min',
        'angular-idle': '../bower_components/ng-idle/angular-idle.min',

        'telerikReportViewer': '../vendor/telerik/js/telerikReportViewer-8.2.14.1204.min',
        'angular-moment': '../bower_components/angular-moment/angular-moment.min'

    },
    shim: {
        'angular': {'exports': 'angular', deps: ['jquery']},

        'angular-animate': { deps: ['angular'] },
        'angular-resource': { deps: ['angular'] },
        'angular-cookies': { deps: ['angular'] },
        'angular-sanitize': { deps: ['angular'] },
        'angular-bootstrap': { deps: ['angular'] },
        'angular-ui-router': { deps: ['angular'] },
        'angular-google-maps': { deps: ['angular'] },
        'angular-ui-utils': { deps: ['angular'] },
        'angular-couch-potato': { deps: ['angular'] },

        'socket.io': { deps: ['angular'] },

        'anim-in-out': { deps: ['angular-animate'] },
        'angular-easyfb': { deps: ['angular'] },
        'angular-google-plus': { deps: ['angular'] },
        'select2': { deps: ['jquery']},
        'summernote': { deps: ['jquery']},

        'to-markdown': {deps: ['he']},

        'bootstrap-markdown': { deps: ['jquery', 'markdown', 'to-markdown']},

        'ckeditor': { deps: ['jquery']},

        'moment': { exports: 'moment'},
        'moment-timezone': { deps: ['moment']},
        'moment-timezone-data': { deps: ['moment']},
        'moment-helper': { deps: ['moment-timezone-data']},
        'bootstrap-daterangepicker': { deps: ['jquery', 'moment']},

        'flot': { deps: ['jquery']},
        'flot-resize': { deps: ['flot']},
        'flot-fillbetween': { deps: ['flot']},
        'flot-orderBar': { deps: ['flot']},
        'flot-pie': { deps: ['flot']},
        'flot-time': { deps: ['flot']},
        'flot-tooltip': { deps: ['flot']},

        'morris': {deps: ['raphael']},

        'datatables':{deps: ['jquery']},
        'datatables-colvis':{deps: ['datatables']},
        'datatables-tools':{deps: ['datatables']},
        'datatables-bootstrap':{deps: ['datatables','datatables-tools','datatables-colvis']},
        'datatables-responsive': {deps: ['datatables']},

        'jqgrid' : {deps: ['jquery']},
        'jqgrid-locale-en' : {deps: ['jqgrid']},

        'jquery-maskedinput':{deps: ['jquery']},
        'jquery-validation':{deps: ['jquery']},
        'jquery-form':{deps: ['jquery']},
        'jquery-color':{deps: ['jquery']},

        'jcrop':{deps: ['jquery-color']},

        'bootstrap-validator':{deps: ['jquery']},

        'bootstrap-timepicker':{deps: ['jquery']},
        'clockpicker':{deps: ['jquery']},
        'nouislider':{deps: ['jquery']},
        'ionslider':{deps: ['jquery']},
        'bootstrap-duallistbox':{deps: ['jquery']},
        'bootstrap-colorpicker':{deps: ['jquery']},
        'jquery-knob':{deps: ['jquery']},
        'bootstrap-slider':{deps: ['jquery']},
        'bootstrap-tagsinput':{deps: ['jquery']},
        'x-editable':{deps: ['jquery']},

        'fuelux-wizard':{deps: ['jquery']},
        'bootstrap':{deps: ['jquery']},

        'magnific-popup': { deps: ['jquery']},
        'modules-includes': { deps: ['angular']},
        'sparkline': { deps: ['jquery']},
        'easy-pie': { deps: ['jquery']},
        'jquery-jvectormap': { deps: ['jquery']},
        'jquery-jvectormap-world-mill-en': { deps: ['jquery']},

        'dropzone': { deps: ['jquery']},

        'bootstrap-progressbar': { deps: ['bootstrap']},


        'jquery-ui': { deps: ['jquery']},
        'jquery-nestable': { deps: ['jquery']},

        'superbox': { deps: ['jquery']},

        'notification': { deps: ['jquery'] },

        'smartwidgets': { deps: ['jquery-ui']},
        'angular-ui-select': ['angular'],
        'ng-tags-input': ['angular'],
        'socket-io': {
            exports: 'io'
        },
        'kendo': { deps: ['jquery', 'angular'] },
        'angular-idle': { deps: ['angular'] }
    },
    priority: [
        'jquery',
        'bootstrap',
        'angular'
    ]
};