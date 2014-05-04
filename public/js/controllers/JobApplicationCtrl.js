angular.module('JobApplicationCtrl', ['ui.bootstrap']).controller('JobApplicationController', function(
	$scope,
	$http,
	$location,
	$rootScope,
	$modal,
	Jobs,
	$stateParams) {


	Jobs.find($stateParams.jobId)
		.success(function(job){
			// console.log(job);
			$scope.job = job;
		})
	$scope.openCV = function(cv,user){
		$modal.open({
			templateUrl: 'views/jobs/cv.view.html',
			controller: function($scope, $modalInstance, cv,user){
				$scope.cv = cv;
				$scope.user = user;
				$scope.close = function(){
					$modalInstance.dismiss();
				}
			},
			resolve: {
				cv: function(){
					return cv;
				},
				user: function(){
					return user;
				}
			}
	    }).result.then(function(data){
	    	console.log(data)
	    })
	}
	$scope.openResume = function(resume){
		$modal.open({
			templateUrl: 'views/jobs/resume.view.html',
			controller: function($scope, $modalInstance, resume){
				$scope.resume = resume
				$scope.close = function(){
					$modalInstance.dismiss();
				}
			},
			resolve: {
				resume: function(){
					return resume;
				}
			}
	    }).result.then(function(data){
	    	console.log(data)
	    })
	}
	$scope.applyJob = function(){
		$modal.open({
			templateUrl: 'views/jobs/applyJob.html',
			controller: function($scope, $modalInstance, job){
				$scope.formData = {}
				$scope.submit = function(){
					Jobs.createApplication(job._id,$scope.formData)
						.success(function(data){
							$modalInstance.close(data);
						});
				  	// Jobs.create($scope.formData)
				  	// 	.success(function(data){
				  	// 		$modalInstance.close(data);
				  	// 	})
				}
				$scope.cancel = function(){
					$modalInstance.dismiss();
				}
			},
			resolve: {
				job: function(){
					return $scope.job;
				}
			}
	    }).result.then(function(data){
	    	console.log(data)
	    	$scope.jobs = data;
	    })
	}
});