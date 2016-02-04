(function () {
    'use strict';

    angular
        .module('app.downloads')
        .controller('Downloads', Downloads);

    Downloads.$inject = ['$q', 'dataservice', 'logger'];

    /* @ngInject */
    function Downloads($q, dataservice, logger) {
        /*jshint validthis: true */
        var vm = this;

        vm.downloads = retrieveDownloads();

        function retrieveDownloads() {
          var releasesArray = [
                                {
                                  environmentType: 	'Production Environments',
                                  environmentName: 	'Production',
                                  applicationName: 	'WOW',
                                  applicationURL:  	'http://localhost:7300',
                                  accessRequestURL: 	'http://localhost:7300',
                                  currentVersion: 	'Dec15.2',
                                  purpose: 			'Production'
                                },
                                {
                                  environmentType: 	'Production Environments',
                                  environmentName: 	'Production',
                                  applicationName: 	'Admin',
                                  applicationURL:  	'http://localhost:7300',
                                  accessRequestURL: 	'http://localhost:7300',
                                  currentVersion: 	'Dec15.2',
                                  purpose: 			'Production'
                                },
                                {
                                  environmentType: 	'Training Environments',
                                  environmentName: 	'Training',
                                  applicationName: 	'WOW',
                                  applicationURL:  	'http://localhost:7300',
                                  accessRequestURL: 	'http://localhost:7300',
                                  currentVersion: 	'Jan16.1',
                                  purpose: 			'Training'
                                },
                                {
                                  environmentType: 	'Training Environments',
                                  environmentName: 	'Training',
                                  applicationName: 	'Admin',
                                  applicationURL:  	'http://localhost:7300',
                                  accessRequestURL: 	'http://localhost:7300',
                                  currentVersion: 	'Jan16.1',
                                  purpose: 			'Training'
                                },
                                {
                                  environmentType: 	'Training Environments',
                                  environmentName: 	'Training',
                                  applicationName: 	'Classic',
                                  applicationURL:  	'http://localhost:7300',
                                  accessRequestURL: 	'http://localhost:7300',
                                  currentVersion: 	'Jan16.1',
                                  purpose: 			'Training'
                                },
                                {
                                  environmentType: 	'Quality Assurance Environments',
                                  environmentName: 	'QA1',
                                  applicationName: 	'WOW',
                                  applicationURL:  	'http://localhost:7300',
                                  accessRequestURL: 	'http://localhost:7300',
                                  currentVersion: 	'Nov16.2',
                                  purpose: 			'Load Testing'
                                },
                                {
                                  environmentType: 	'Quality Assurance Environments',
                                  environmentName: 	'QA1',
                                  applicationName: 	'Admin',
                                  applicationURL:  	'http://localhost:7300',
                                  accessRequestURL: 	'http://localhost:7300',
                                  currentVersion: 	'Nov16.2',
                                  purpose: 			'Load Testing'
                                },
                                {
                                  environmentType: 	'Quality Assurance Environments',
                                  environmentName: 	'QA3',
                                  applicationName: 	'WOW',
                                  applicationURL:  	'http://localhost:7300',
                                  accessRequestURL: 	'http://localhost:7300',
                                  currentVersion: 	'Oct15.2',
                                  purpose: 			'Load Testing'
                                }
                                ];

      var prodKey = 'Production Environments',
          prodReleases = [],
          trainKey = 'Training Environments',
          trainReleases = [],
          qaKey = 'Quality Assurance Environments',
          qaReleases = [];

      for(var i = 0; i < releasesArray.length; i++) {
          var envType = releasesArray[i].environmentType;
          if (envType === prodKey) {
              prodReleases.push(releasesArray[i]);
          } else if (envType === trainKey) {
              trainReleases.push(releasesArray[i]);
          } else if (envType === qaKey) {
              qaReleases.push(releasesArray[i]);
          }
      }

      var downloads = [
                    		{
                    			rtype: prodKey,
                    			rarray: prodReleases
                    		},
                    		{
                    			rtype: trainKey,
                    			rarray: trainReleases
                    		},
                    		{
                    			rtype: qaKey,
                    			rarray: qaReleases
                    		},
      ];

      return downloads;
     }

    }

})();
