define(['../inhalerTechnique.module'], function (module) {

    'use strict';

    module.registerDirective('gcInhalerType', gcInhalerType);

    function gcInhalerType($sce) {

        console.log('Creating gcInhalerType directive.');

        var directive = {
            link: link,
            restrict: 'E',
            replace: true,
            scope: {
                asthmaAttributes: '=',
                inhalerVisibility: '=',
                name: '@'
            },
            templateUrl: 'app/programs/inhalerTechnique/directives/templates/gcInhalerType.html'
        };

        function link(scope, element, attrs) {
            scope.inhalerTypeList = ['Accuhaler', 'Handihaler', 'Metered Dose WITH a spacer', 'Metered Dose WITHOUT a spacer'];

            //scope.InhalerVideoVimeo = '//player.vimeo.com/video/28438994';
            //$sce.trustAsResourceUrl($scope.currentProject.url); 
            scope.$watch('asthmaAttributes["@InhalerType"]', function (value) {

                var hostUrl = '';
                switch (value) {
                    case 'Accuhaler':
                        scope.InhalerVideoLink = 'http://www.nationalasthma.org.au/how-to-videos/using-your-inhaler/accuhaler';
                        scope.InhalerVideoSource = hostUrl + 'Video/accuhaler.wmv';
                        scope.InhalerVideoVimeo = $sce.trustAsResourceUrl('//player.vimeo.com/video/28492398');
                    case 'Handihaler':
                        scope.InhalerVideoLink = 'http://www.nationalasthma.org.au/how-to-videos/using-your-inhaler/handihaler';
                        scope.InhalerVideoSource = hostUrl + 'Video/handihaler.wmv';
                        scope.InhalerVideoVimeo = $sce.trustAsResourceUrl('//player.vimeo.com/video/28496052');
                    case 'Metered Dose WITH a spacer':
                        scope.InhalerVideoLink = 'http://www.nationalasthma.org.au/how-to-videos/using-your-inhaler/standard-mdi-with-spacer';
                        scope.InhalerVideoSource = hostUrl + 'Video/Using%20Your%20Inhaler%20-%20Standard%20Metered%20Dose%20Inhaler%20and%20Spacer.wmv';
                        scope.InhalerVideoVimeo = $sce.trustAsResourceUrl('//player.vimeo.com/video/28435680');
                    case 'Metered Dose WITHOUT a spacer':
                        scope.InhalerVideoLink = 'http://www.nationalasthma.org.au/how-to-videos/using-your-inhaler/standard-mdi';
                        scope.InhalerVideoSource = hostUrl + 'Video/Using%20Your%20Inhaler%20-%20Standard%20Metered%20Dose%20Inhaler%20(Puffer).wmv';
                        scope.InhalerVideoVimeo = $sce.trustAsResourceUrl('//player.vimeo.com/video/28438994');
                    default:
                        scope.InhalerVideoLink = 'http://www.nationalasthma.org.au/how-to-videos/using-your-inhaler/standard-mdi';
                        scope.InhalerVideoSource = hostUrl + 'Video/Using%20Your%20Inhaler%20-%20Standard%20Metered%20Dose%20Inhaler%20(Puffer).wmv';
                        scope.InhalerVideoVimeo = $sce.trustAsResourceUrl('//player.vimeo.com/video/28438994');
                }

                setInhalerVisibility(value);
            });
            

            function setInhalerVisibility(inhalerType) {
                if (!scope.inhalerVisibility) {
                    return;
                }
                switch (inhalerType) {
                    case 'Accuhaler':
                        scope.inhalerVisibility.AccuhalerVisible = true;
                        scope.inhalerVisibility.HandihalerVisible = false;
                        scope.inhalerVisibility.WithSpacerVisible = false;
                        scope.inhalerVisibility.WithoutSpacerVisible = false;
                        scope.inhalerVisibility.InhalerPanelsVisibility = true;
                        break;
                    case 'Handihaler':
                        scope.inhalerVisibility.AccuhalerVisible = false;
                        scope.inhalerVisibility.HandihalerVisible = true;
                        scope.inhalerVisibility.WithSpacerVisible = false;
                        scope.inhalerVisibility.WithoutSpacerVisible = false;
                        scope.inhalerVisibility.InhalerPanelsVisibility = true;
                        break;
                    case 'Metered Dose WITH a spacer':
                        scope.inhalerVisibility.AccuhalerVisible = false;
                        scope.inhalerVisibility.HandihalerVisible = false;
                        scope.inhalerVisibility.WithSpacerVisible = true;
                        scope.inhalerVisibility.WithoutSpacerVisible = false;
                        scope.inhalerVisibility.InhalerPanelsVisibility = true;
                        break;
                    case 'Metered Dose WITHOUT a spacer':
                        scope.inhalerVisibility.AccuhalerVisible = false;
                        scope.inhalerVisibility.HandihalerVisible = false;
                        scope.inhalerVisibility.WithSpacerVisible = false;
                        scope.inhalerVisibility.WithoutSpacerVisible = true;
                        scope.inhalerVisibility.InhalerPanelsVisibility = true;
                        break;
                    default:
                        scope.inhalerVisibility.AccuhalerVisible = false;
                        scope.inhalerVisibility.HandihalerVisible = false;
                        scope.inhalerVisibility.WithSpacerVisible = false;
                        scope.inhalerVisibility.WithoutSpacerVisible = false;
                        scope.inhalerVisibility.InhalerPanelsVisibility = false;
                        break;
                }

                //NotifyInhalerTypeChanged();
            }
        };

        return directive;
    }

});
