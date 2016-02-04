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
                url: '/news',
                config: {
                    title: 'News',
                    controller: 'NewsList',
                    controllerAs: 'vm',
                    templateUrl: 'app/news/newslist.html',
                    settings: {
                        content: 'News'
                    }
                }
            }, {
                url: '/news/:newsId',
                config: {
                    title: 'Display News',
                    controller: 'ViewNews',
                    controllerAs: 'vm',
                    templateUrl: 'app/news/viewnews.html',
                    settings: {
                        content: 'Display News'
                    }
                }
            }, {
                url: '/searchresults',
                config: {
                    title: 'Search Results',
                    controller: 'NewsList',
                    controllerAs: 'vm',
                    templateUrl: 'app/news/searchresults.html',
                    settings: {
                        content: 'Search Results'
                    }
                }
            }, {
                url: '/goodies/:type',
                config: {
                    title: 'Goodies',
                    controller: 'ViewNewsByType',
                    controllerAs: 'vm',
                    templateUrl: 'app/news/viewnews.html',
                    settings: {
                        content: 'Goodies'
                    }
                }
            }, {
                url: '/subscribe/:type',
                config: {
                    title: 'Subscribe to ETMS',
                    controller: 'ViewNewsByType',
                    controllerAs: 'vm',
                    templateUrl: 'app/news/viewnews.html',
                    settings: {
                        content: 'Subscribe'
                    }
                }
            }
        ];
    }
})();
