angular.module('ViewCtrl', []).controller('ViewController', function($scope,$routeParams,Resumes) {

	Resumes.find($routeParams.resume_id)
		.success(function(resume){
			$scope.resume = resume;
		});
});