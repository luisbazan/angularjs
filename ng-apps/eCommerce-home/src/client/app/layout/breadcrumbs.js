(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('BreadCrumbs', BreadCrumbs);

    BreadCrumbs.$inject = ['$scope', '$route'];

    function BreadCrumbs($scope, $route, routehelper) {
        /*jshint validthis: true */
        var vm = this;

        setBreadCrumbs($route.current);

        $scope.$on('$routeChangeSuccess', function(angularEvent, current, previous) {
          setBreadCrumbs(current, previous);
         });

        function setBreadCrumbs(current, previous) {
          vm.breadcrumbs = '<span>Home</span>';
          if(current.$$route && current.$$route.settings && current.$$route.settings.content) {
            if (current.$$route.settings.content.toLowerCase() !== 'news') {
               vm.breadcrumbs = '<span><a href="#/news">Home</a></span> <i class="fa fa-chevron-right"></i> <span>' +
                  current.$$route.settings.content + '</span>';
            }
          }
        }
    }
})();
