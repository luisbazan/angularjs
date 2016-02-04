(function () {
    'use strict';

    angular
        .module('app.etms.news')
        .controller('ViewNewsByType', ViewNewsByType);

    ViewNewsByType.$inject = ['logger', 'newsService', '$controller', '$routeParams'];

    /* @ngInject */
    function ViewNewsByType(logger, newsService, $controller, $routeParams) {
        /*jshint validthis: true */
        var vm = this;
        vm.type = $routeParams.type;

        activate();

        getNewsArticleByType(vm.type);

        function getNewsArticleByType(type) {
            return newsService.getNewsArticleByType(type).then(function(data) {
                bindingNewArticle(data);
                return data;
            });
        }

        function bindingNewArticle(data) {
            var article;

            if (angular.isArray(data) && data.length > 0) {
                article = data[0];

                vm.contentHtml = article.content;
                vm.modifiedBy = 'Modified By';
                vm.author = article.lastUpdateUserId.name;
                vm.lastUpdateTime = article.lastUpdateTime;
                vm.separator = ' - ';
                vm.title = article.title;
            }
        }

        function activate() {
            //logger.info('Activated View News By Type');
        }
    }
})();
