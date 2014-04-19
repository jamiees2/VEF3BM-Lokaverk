angular.module('JobCtrl', []).controller('JobController', function($scope,$http,$location,$rootScope,Jobs) {
	$scope.formData = {
		company: {},
		description: {}
	}
	console.log($scope.user)
	Jobs.get()
		.success(function(data){
			$scope.jobs = data;
		});
	$scope.toggleAddJob = function(){
		$scope.addingJob = !$scope.addingJob;
	}
	$scope.showMyJobs = function(){
		Jobs.getMyJobs()
			.success(function(data){
				$scope.jobs = data;
			})
	}
	$scope.submitForm = function(){
		if (!!$scope.editingJob) {
			Jobs.update($scope.formData._id,$scope.formData)
				.success(function(data){
					console.log("SUCCESS")
				})
			$scope.addingJob = false;

		} else {
			Jobs.create($scope.formData)
				.success(function(data){
					console.log("Success")
				})
		}
		$scope.editingJob = false;
	}
	$scope.editJob = function(job){
		$scope.addingJob = true;
		$scope.editingJob = true;
		$scope.formData = job;
	}
	$scope.deleteJob = function(job){
		Jobs.delete(job._id)
			.success(function(data){
				$scope.jobs = data;
			});
	}
});