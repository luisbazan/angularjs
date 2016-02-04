(function () {
    'use strict';

    angular
        .module('app.layout')
        .controller('Sidebar', Sidebar);

    Sidebar.$inject = ['$route', 'routehelper'];

    function Sidebar($route, routehelper) {
        /*jshint validthis: true */
        var vm = this;
        var routes = routehelper.getRoutes();

        vm.isCurrent = isCurrent;

        // Crowdaround part
        vm.crowdaroundTooltip = 'Start or Join a Discussion!\n' +
            'Click here to be taken to the ETMS Crowdaround site where you can present feature requests, ' +
            'usability complaints, questions, or if you are in good mood, compliments are always nice too. ' +
            'You can also search for answers to your questions, join ongoing discussions and help your ' +
            'fellow user if you know the answer to their question.\n' +
            'Please do not report urgent application issues here.';
        vm.crowdaroundLink = 'https://crowdaround.verizon.com/groups/etms-enterprise-trouble-management-system/content';

        activate();

        function activate() { getNavRoutes(); }

        function getNavRoutes() {
            vm.navRoutes = routes.filter(function (r) {
                return r.settings && r.settings.nav;
            }).sort(function (r1, r2) {
                return r1.settings.nav - r2.settings.nav;
            });
        }

        function isCurrent(route) {
            if (!route.title || !$route.current || !$route.current.title) {
                return '';
            }
            var menuName = route.title;
            return $route.current.title.substr(0, menuName.length) === menuName ? 'current' : '';
        }
    }
})();
