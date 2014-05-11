angular.module('appRoutes', []).config(function($routeProvider, $locationProvider, $httpProvider, $stateProvider, $urlRouterProvider) {
	//Add error handling to the ajax requests
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
            else if (response.status === 500)
            	alert("Server error")
            return $q.reject(response);
          }
        );
      }
    });
	//Enable html5 pushState routing
	$locationProvider.html5Mode(true);
	//All routes not matched by a state lead to home
	$urlRouterProvider.otherwise("/");
	//Ruoutes
	$stateProvider
	    .state('root', {
	    	url: '/',
			templateUrl: 'views/index.html'
	    })
	    .state('resume',{
	    	url: '/resume',
	    	templateUrl: 'views/user/resume.view.html',
	    	controller: function($scope,Resumes) {
	    		//Refresh resume on edit
	    		$scope.$on('$locationChangeSuccess', function () {
			          $scope.search();
			    });
			    $scope.editable = true;
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
	    .state('user_resume',{
	    	url: '/user/resume/:userId',
	    	templateUrl: 'views/user/resume.view.html',
	    	controller: function($scope,Resumes,$stateParams) {
			    $scope.search = function(){
					Resumes.getUser($stateParams.userId)
						.success(function(resume){
							$scope.resume = resume;
						});
				}
				$scope.search();
			}
	    })
	    .state('signup',{
	    	url: '/signup',
	    	templateUrl: 'views/auth/signup.html',
	    	controller: function($rootScope,$scope,$location,Auth){
	    		if ($rootScope.user)
	    			$location.path('/')
	    		$scope.formData = {}
				$scope.submitForm = function(){
					Auth.signup($scope.formData)
						.success(function(data){
							$location.path('/');
						});
				}
	    	}
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