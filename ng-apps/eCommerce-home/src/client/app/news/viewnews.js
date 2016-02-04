(function () {
    'use strict';

    angular
        .module('app.etms.news')
        .controller('ViewNews', ViewNews);

    ViewNews.$inject = ['logger', 'newsService', '$controller', '$routeParams'];

    /* @ngInject */
    function ViewNews(logger, newsService, $controller, $routeParams) {
        /*jshint validthis: true */
        var vm = this;
        vm.newsId = $routeParams.newsId;

        activate();

        getNewsArticle(vm.newsId);

        function getNewsArticle(articleId) {
            return newsService.getNewsArticle(articleId).then(function(data) {
                bindingNewArticle(data);
                return data;
            });
        }

        function bindingNewArticle(data) {
            vm.contentHtml = data.content;
            vm.modifiedBy = 'Modified By';
            vm.author = data.lastUpdateUserId.name;
            vm.lastUpdateTime = data.lastUpdateTime;
            vm.separator = ' - ';
            vm.title = data.title;
        }

        function activate() {
            logger.info('Activated View News');
        }
    }
})();
