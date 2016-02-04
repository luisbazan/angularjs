(function () {
    'use strict';

    angular
        .module('app.core')
        .factory('dataservice', dataservice);

    dataservice.$inject = ['$q'];

    /* @ngInject */
    function dataservice($q) {
        var service = {
            getPeople: getPeople,
            getMessageCount: getMessageCount,
            getApps: getApps
        };

        return service;

        function getMessageCount() { return $q.when(72); }

        function getPeople() {
            var people = [
                { firstName: 'John', lastName: 'Papa', age: 25, location: 'Florida' },
                { firstName: 'Ward', lastName: 'Bell', age: 31, location: 'California' },
                { firstName: 'Colleen', lastName: 'Jones', age: 21, location: 'New York' },
                { firstName: 'Madelyn', lastName: 'Green', age: 18, location: 'North Dakota' },
                { firstName: 'Ella', lastName: 'Jobs', age: 18, location: 'South Dakota' },
                { firstName: 'Landon', lastName: 'Gates', age: 11, location: 'South Carolina' },
                { firstName: 'Haley', lastName: 'Guthrie', age: 35, location: 'Wyoming' }
            ];
            return $q.when(people);
        }

        function getApps(count) {
            var apps = [];

            for (var i = 1; i <= count; i++) {
                apps.push({
                    appId: 'SA' + i,
                    appName: 'SA ' + i + ' App',
                    teamName: 'Team ' + i,
                    leadName: 'Lead ' + i
                });
            }
            return $q.when(apps);
        }
    }
})();
