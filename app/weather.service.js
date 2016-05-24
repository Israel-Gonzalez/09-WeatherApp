(function() {
    'use strict';

    angular
        .module('weatherApp')
        .factory('weatherFactory', weatherFactory);

    weatherFactory.$inject = ['$http', '$q', '$log'];

    /* @ngInject */
    function weatherFactory($http, $q, $log) {
        var service = {
            getWeather: getWeather
        };
        return service;

        ////////////////

        function getWeather(searchTerm) {

        	var defer = $q.defer();

			$http({
				url:"http://api.openweathermap.org/data/2.5/weather", 
				method: "GET",
				params: {q:searchTerm,  appid:"d259a5b0db02ae7ce76d103ee0642c97", units: "imperial"}
				
			}).then(
			function(response) {
				if(typeof response.data === 'object'){
					defer.resolve(response);
					toastr.success("Current weather for " + " " + searchTerm)
				} else {
					defer.reject(response);
				}
			}, 
			//failure
			function(error) {
				defer.reject(error);
				$log.error(error);
			}
		)

		return defer.promise;
		
		}    
    }
})();