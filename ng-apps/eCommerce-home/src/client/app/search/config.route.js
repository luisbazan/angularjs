(function () {
    'use strict';

    angular
        .module('app.etms.news')
        .run(appRun);

    appRun.$inject = ['routehelper'];

    /* @ngInject */
    function appRun (routehelper){
        routehelper.configureRoutes(getRoutes());
    }

    function getRoutes() {
        return [
            {
                url: '/searchresults/:keyword',
                config: {
                    title: 'Search Results',
                    controller: 'Search',
                    controllerAs: 'vm',
                    templateUrl: 'app/search/searchresults.html',
                    settings: {
                        content: 'Search Results'
                    }
                }
            }
          ];
    }
})();
