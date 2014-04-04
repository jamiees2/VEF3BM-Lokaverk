angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// resume page that will use the ResumeController
		.when('/', {
			templateUrl: 'views/resume.html',
			controller: 'ResumeController'
		})
		.when('/resume/:resume_id', {
			templateUrl: 'views/view.html',
			controller: 'ViewController'
		})

	$locationProvider.html5Mode(true);

}]);