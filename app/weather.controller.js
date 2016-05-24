(function() {
    'use strict';

    angular
        .module('weatherApp')
        .controller('weatherCtrl', weatherCtrl);

    weatherCtrl.$inject = ['$log', 'weatherFactory'];

    /* @ngInject */
    function weatherCtrl($log, weatherFactory) {
        var vm = this;
        vm.title = 'weatherCtrl';

        vm.searchResults = [];
        vm.searchTerm = '';

        vm.getWeather = function() {
            weatherFactory.getWeather(vm.searchTerm).then(
                function(response) {
                    vm.weather = response.data;
                    vm.searchResults.push({ 'name': vm.searchTerm, 'time': moment().format('YYYY-MM-DD h:mm:ss') });

                    console.log(response.data);
                },
                function(error) {
                    $log.error('failure getting weather', error)
                }
            );

        }

    };
})();
