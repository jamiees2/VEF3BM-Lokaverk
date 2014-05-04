angular.module('appRoutes', []).config(function($routeProvider, $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
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
	// $routeProvider

	// 	// resume page that will use the ResumeController
	// 	.when('/', {
	// 		templateUrl: 'views/index.html',
	// 		controller: 'MainController'
	// 	})
	// 	.when('/jobs', {
	// 		templateUrl: 'views/jobs.html',
	// 		controller: 'JobController'
	// 	})
	// 	.when('/resume/edit', {
	// 		templateUrl: 'views/resume.html',
	// 		controller: 'ResumeController'
	// 	})
	// 	.when('/resume', {
	// 		templateUrl: 'views/view.html',
	// 		controller: 'ViewController'
	// 	})
	// 	.when('/login', {
	// 		templateUrl: 'views/login.html',
	// 		controller: 'LoginController'
	// 	})
	// 	.when('/logout', {
	// 		controller: 'LogoutController',
	// 		templateUrl: 'views/empty.html'
	// 	});

	$locationProvider.html5Mode(true);

	$urlRouterProvider.otherwise("/");
	$stateProvider
	    .state('root', {
	    	url: '/',
			templateUrl: 'views/index.html'
	    })
	    .state('resume',{
	    	url: '/resume',
	    	templateUrl: 'views/user/resume.view.html',
	    	controller: function($scope,Resumes) {
	    		$scope.$on('$locationChangeSuccess', function () {
			          $scope.search();
			    });
			    $scope.search = function(){
					Resumes.get()
						.success(function(resume){
							$scope.resume = resume;
						});
				}
				$scope.search();
			}
	    })
	    .state('resume.edit',{
	    	url: '/edit',
	    	templateUrl: 'views/user/resume.html',
	    	controller: 'ResumeController'
	    })
	    .state('jobs',{
	    	url: '/jobs',
	    	templateUrl: 'views/jobs/jobs.html',
	    	controller: 'JobController'
	    })
	    .state('jobs.view',{
	    	url: '/view/:jobId',
	    	templateUrl: 'views/jobs/job.html',
	    	controller: 'JobApplicationController'
	    })
	    .state('login',{
	    	url: '/login',
	    	templateUrl: 'views/auth/login.html',
	    	controller: function($scope,$location,Auth){
	    		$scope.formData = {}
				$scope.submitForm = function(){
					Auth.login($scope.formData)
						.success(function(data){
							$location.path('/');
						});
				}
	    	}
	    })
	    .state('logout',{
	    	url: '/logout',
	    	template: "",
	    	controller: function($scope,$location,Auth){
	    		Auth.logout().success(function(){
					$location.path('/');
				});
	    	}
	    })

});