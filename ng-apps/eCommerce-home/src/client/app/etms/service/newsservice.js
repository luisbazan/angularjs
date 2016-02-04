(function () {
    'use strict';

    angular
        .module('app.etms.service')
        .factory('newsService', newsService);

    newsService.$inject = ['$http', '$q'];

    /* @ngInject */
    function newsService($http, $q) {
        var service = {
            getCarouselArticles: getCarouselArticles,
            getNewsArticles: getNewsArticles,
            getFeatureImage: getFeatureImage,
            getNewsArticle: getNewsArticle,
            getNewsArticleByType: getNewsArticleByType
        };

        return service;

        function getCarouselArticles() {
            return $http.get('/etms/rest/sysadmin/news/articles/attachments/carousel').then(onArticles);
        }

        function getFeatureImage() {
            return $http.get('/etms/rest/sysadmin/news/featureimage/body?_dc=' + new Date().getMilliseconds()).then(onArticles);
        }

        function getNewsArticles(pageNumber, pageSize, keyword) {
            return $http.get('/etms/rest/sysadmin/news/articles', {
                params: {
                    page: pageNumber || 1,
                    pageSize: pageSize || 10,
                    keyword: keyword || ''
                }
            }).then(onArticles);
        }

        function getNewsArticle(articleId) {
            return $http.get('/etms/rest/sysadmin/news/articles/'+ articleId).then(onArticles);
        }

        function getNewsArticleByType(type) {
            return $http.get('/etms/rest/sysadmin/news/articles/type/'+ type).then(onArticles);
        }

        function onArticles(response) {
            return response.data;
        }
    }
})();
