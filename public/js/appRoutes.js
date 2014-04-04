angular.module('appRoutes', []).config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {

	$routeProvider

		// home page
		.when('/', {
			templateUrl: 'views/home.html',
			controller: 'MainController'
		})

		// resume page that will use the ResumeController
		.when('/resumes', {
			templateUrl: 'views/resume.html',
			controller: 'ResumeController'
		})

	$locationProvider.html5Mode(true);

}]);