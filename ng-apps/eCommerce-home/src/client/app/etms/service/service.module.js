(function () {
    'use strict';

    angular.module('app.etms.service', []).run(function($http) {
      debugger;
      $http.defaults.headers.common['client-fx'] = 'ng-etms';
      
    });

})();
