angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', '$httpProvider', function($routeProvider, $locationProvider, $httpProvider) {
	$httpProvider.responseInterceptors.push(function($q, $location) {
      return function(promise) {
        return promise.then(
          // Success: just return the response
          function(response){
            return response;
          }, 
          // Error: check the error status to get only the 401
          function(response) {
            if (response.status === 401)
              $location.url('/login');
            return $q.reject(response);
          }
        );
      }
    });
	$routeProvider

		// resume page that will use the ResumeController
		.when('/', {
			templateUrl: 'views/index.html',
			controller: 'MainController'
		})
		.when('/resume/edit', {
			templateUrl: 'views/resume.html',
			controller: 'ResumeController'
		})
		.when('/resume', {
			templateUrl: 'views/view.html',
			controller: 'ViewController'
		})
		.when('/login', {
			templateUrl: 'views/login.html',
			controller: 'LoginController'
		})
		.when('/logout', {
			controller: 'LogoutController',
			templateUrl: 'views/empty.html'
		});

	$locationProvider.html5Mode(true);

}]);