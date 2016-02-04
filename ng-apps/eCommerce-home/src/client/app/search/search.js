(function () {
    'use strict';

    angular
        .module('app.etms.search')
        .controller('Search', Search);

    Search.$inject = ['logger', 'newsService', '$controller'];

    /* @ngInject */
    function Search(logger, newsService, $controller) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'Search';
        vm.currentPage = 1;
        vm.pageSize = 25;

        vm.verticalNews = [];
        vm.allNews = [];

        vm.keyword = '';
        vm.loadMoreNews = loadMoreNews;
        vm.getNewsArticles = getNewsArticles;

        activate();

        /**
         *
         */
        function getNewsArticles(pageNumber, pageSize, keyword) {
            return newsService.getNewsArticles(pageNumber, pageSize, keyword).then(function(data) {
                bindingNews(data);
                return data;
            });
        }

        function bindingNews(data) {
        //  var feature = $controller('Feature');

          if (angular.isArray(data) && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              var news = data[i];
              news['imgSrc'] = getImageSrc(news.attachments);
              vm.allNews.push(news);
            }
          }
        }

        /**
         * Load the next bunch of news to the main view
         */
        function loadMoreNews() {
          getNewsArticles(vm.currentPage, vm.pageSize, vm.keyword);
          vm.currentPage = vm.currentPage + 1;
        }

        /**
         * Get the article image source from the article's attachments
         */
        function getImageSrc(attachments) {
          var attachment, filename, fileType, src, id, allowTypeFiles = ['jpg', 'png', 'jpeg', 'gif', 'bmp'];

          if (angular.isArray(attachments) && attachments.length > 0) {
        	   for (var i = 0; i < attachments.length; i++) {
        	      var att = attachments[i];

        	      if (att.type === 'article') {
                  attachment = att;
        		      break;
        		    }
              }
          }

        	if (attachment) {
            filename = attachment.fileName;
        		fileType = filename.split('.').pop();
        		if (allowTypeFiles.indexOf(fileType.toLowerCase()) !== -1) {
          	   id = attachment.id;
               return '/etms/rest/sysadmin/news/articles/image/' + id;
            }
          }

          return 'content/images/vz_logo_article.png';
        }

        function activate() {
            //logger.info('Activated News View');
        }
    }
})();
