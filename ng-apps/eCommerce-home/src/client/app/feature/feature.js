(function () {
    'use strict';

    angular
        .module('app.etms.news')
        .controller('Feature', Feature);

    Feature.$inject = ['$q', 'newsService', '$sce'];

    /* @ngInject */
    function Feature($q, newsService, $sce) {
        var vm = this, serviceImage = '/etms/rest/sysadmin/news/featureimage/image?_dc=' + new Date().getMilliseconds();
        vm.src = serviceImage;
        vm.isEmptyFeature = true;

        activate();

        function activate() {
            //logger.info('Feature loaded');
            var promises = [getFeatureImage()];
            return $q.all(promises).then(function(){
                //logger.info('Activated Applications View');
                //TODO
            });
        }

        function getFeatureImage() {
            return newsService.getFeatureImage().then(function(data) {
                bindingFeatureImage(data);
                return data;
            }
          ).catch(function (response) {
                //TODO
          });
        }

        function bindingFeatureImage(data){
          vm.title = data.title;
          vm.author = data.lastUserUpdate.name;
          vm.date = data.lastUpdateDate;
          vm.postedBy = 'Modified By';
          vm.separator = '-';
          vm.url = formatUrlVideo(data.url);
          vm.isEmptyFeature = false;

          if (data.url && isValidUrlVideo(vm.url)) {
            var newUrl = returnNewUrlVideo(vm.url),
                frame = '<iframe src="' + newUrl + '" class="img-responsive" frameBorder="0"></iframe>';
            vm.divFeatureImageLink = $sce.trustAsHtml(frame);
          } else {
            vm.divFeatureImageLink = '<img src="' + vm.src + '" alt="" class="img-responsive" />';
          }
        }

        function isValidUrlVideo(url) {
          return url.indexOf('https://vztube.verizon.com/videos/') === 0;
        }

        function formatUrlVideo(url) {
          if (angular.isDefined(url)) {
            url = url.toLowerCase();
            if (url.indexOf('vztube') > -1) {
  		    		url = url.replace('http://', 'https://');
  		    		// I don't know why vztube has two domains but both have exactly the same information
  		    		url = url.replace('vztube.vzwcorp.com', 'vztube.verizon.com');
  		    	}
          }
          return url;
        }

        function returnNewUrlVideo(url) {
          var id;
          url = url.replace('https://vztube.verizon.com/videos/', '');
          id = url.substr(0, url.indexOf('/'));
          return 'https://vztube.verizon.com/getVideoID.php?type=embed&id=' + id + '&width=auto';
        }
    }
})();
