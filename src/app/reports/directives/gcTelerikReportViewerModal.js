define(['../reports.module'], function (module) {

    'use strict';

    module.registerDirective('gcTelerikReportViewerModal', gcTelerikReportViewerModal);

    function gcTelerikReportViewerModal() {

        console.log('Creating gcTelerikReportViewerModal directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                reportName: '=',
                programDocumentId: '='
            },
            templateUrl: 'app/reports/directives/templates/gcTelerikReportViewerModal.html'
        };

        function link(scope, element, attrs) {
            //Watch the report name, from the vm. This is updated when the user selects a pharmacy report.
            // On updated, update the report params and refresh to show the new report.
            scope.$watch('reportName', function (newValue) {
                console.log('Report selected, rendering: ' + newValue);

                var reportViewer = $("#reportViewer1").data("telerik_ReportViewer");

                if (scope.programDocumentId) {
                    reportViewer.reportSource({
                        report: scope.reportName,
                        parameters: {"ProgramDocumentId" : scope.programDocumentId}
                    });
                } else {
                    reportViewer.reportSource({
                        report: scope.reportName
                    });
                }

                reportViewer.refreshReport();
            });

            //Prepare the report once the page is ready.
            angular.element(document).ready(function () {

                console.log('Report: ' + scope.reportName);
                console.log('Id: ' + scope.programDocumentId);

                //If a program document Id is present, assume this is a program report and attach report params.
                if (scope.programDocumentId) {
                    $("#reportViewer1")
                        .telerik_ReportViewer({
                            serviceUrl: "https://beta.guildcareservices.com.au/PS.Win.ReportServicesRest/api/reports",
                            templateUrl: '../vendor/telerik/templates/telerikReportViewerTemplate-8.2.14.1204.html',
                            viewMode: telerikReportViewer.ViewModes.INTERACTIVE,
                            scaleMode: telerikReportViewer.ScaleModes.SPECIFIC,
                            reportSource: {
                                report: scope.reportName,
                                parameters: {"ProgramDocumentId" : scope.programDocumentId}
                            },
                            scale: 1.0,
                            ready: function () {
                                this.refreshReport();
                            }
                        });
                } else {
                    $("#reportViewer1")
                        .telerik_ReportViewer({
                            serviceUrl: "https://beta.guildcareservices.com.au/PS.Win.ReportServicesRest/api/reports",
                            templateUrl: '../vendor/telerik/templates/telerikReportViewerTemplate-8.2.14.1204.html',
                            viewMode: telerikReportViewer.ViewModes.INTERACTIVE,
                            scaleMode: telerikReportViewer.ScaleModes.SPECIFIC,
                            scale: 1.0,
                            ready: function () {
                                this.refreshReport();
                            }
                        });
                }
            });
        };

        return directive;
    }
})
;