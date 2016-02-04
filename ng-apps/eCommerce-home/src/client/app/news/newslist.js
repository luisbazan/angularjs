(function () {
    'use strict';

    angular
        .module('app.etms.news')
        .controller('NewsList', NewsList);

    NewsList.$inject = ['$q', 'logger', 'newsService'];

    /* @ngInject */
    function NewsList($q, logger, newsService) {
        /*jshint validthis: true */
        var vm = this;

        vm.title = 'News';
        vm.newsLoaded = false;
        vm.currentPage = 1;
        vm.pageSize = 25;

        vm.allNews = [];

        vm.searchText = '';
        vm.doSearch = doSearch;
        vm.loadMoreNews = loadMoreNews;

        activate();

        function activate() {
            var promises = [getNewsArticles(vm.currentPage, vm.pageSize)];
            return $q.all(promises).then(function(){
                vm.newsLoaded = true;
                logger.info('Activated News List View');
            });
        }

        function getNewsArticles(pageNumber, pageSize) {
            return newsService.getNewsArticles(pageNumber, pageSize).then(function(data) {
                bindingNews(data);
                return data;
            });
        }

        function bindingNews(data) {
          if (angular.isArray(data) && data.length > 0) {
            for (var i = 0; i < data.length; i++) {
              var news = data[i];
              news['imgSrc'] = getImageSrc(news.attachments);

              if (i === 0) {
                vm.mainNews = news;
              }
              else {
                vm.allNews.push(news);
              }
            }
          }
        }

        /**
         * Load the next bunch of news to the main view
         */
        function loadMoreNews() {
          vm.currentPage = vm.currentPage + 1;
          getNewsArticles(vm.currentPage, vm.pageSize);
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

        function doSearch(value) {

        }
    }
})();
