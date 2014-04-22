angular.module('JobApplicationCtrl', ['ui.bootstrap']).controller('JobApplicationController', function(
	$scope,
	$http,
	$location,
	$rootScope,
	$modal,
	Jobs,
	$stateParams) {
	console.log($stateParams)
	Jobs.find($stateParams.jobId)
		.success(function(job){
			$scope.job = job;
		})
});