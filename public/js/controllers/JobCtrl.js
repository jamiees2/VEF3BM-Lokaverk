angular.module('JobCtrl', ['ui.bootstrap']).controller('JobController', function($scope,$http,$location,$rootScope,$modal,Jobs) {
	$scope.formData = {
		company: {},
		description: {}
	}
	Jobs.get()
		.success(function(data){
			$scope.jobs = data;
		});
	// $scope.toggleAddJob = function(){
	// 	$scope.addingJob = !$scope.addingJob;
	// }
	$scope.addJob = function(){
		$modal.open({
			templateUrl: 'views/jobs/addJob.html',
			controller: function($scope, $modalInstance, data, Jobs){
				$scope.formData = data;
				$scope.submit = function(){
				  	Jobs.create($scope.formData)
				  		.success(function(data){
				  			$modalInstance.close(data);
				  		})
				}
				$scope.cancel = function(){
					$modalInstance.dismiss();
				}
			},
			resolve: {
				data: function(){
					return $scope.formData;
				},
				Jobs: function(){
					return Jobs;
				}
			}
	    }).result.then(function(data){
	    	console.log(data)
	    	$scope.jobs = data;
	    })
	}
	$scope.showJobs = function(){
		$scope.myJobs = false;
		Jobs.get()
			.success(function(data){
				$scope.jobs = data;
			})
	}
	$scope.showMyJobs = function(){
		$scope.myJobs = true;
		Jobs.getMyJobs()
			.success(function(data){
				$scope.jobs = data;
			})
	}
	$scope.editJob = function(job){
		$modal.open({
			templateUrl: 'views/jobs/addJob.html',
			controller: function($scope, $modalInstance, data, Jobs){
				$scope.formData = data;
				$scope.submit = function(){
				  	Jobs.update(data._id,$scope.formData)
				  		.success(function(data){
				  			$modalInstance.close(data);
				  		})
				}
				$scope.cancel = function(){
					$modalInstance.dismiss();
				}
			},
			resolve: {
				data: function(){
					return job;
				},
				Jobs: function(){
					return Jobs;
				}
			}
	    }).result.then(function(data){
	    	console.log(data)
	    	$scope.jobs = data;
	    })
	}
	$scope.deleteJob = function(job){
		Jobs.del(job._id)
			.success(function(data){
				$scope.jobs = data;
			});
	}
});