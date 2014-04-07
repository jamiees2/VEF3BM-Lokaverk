angular.module('ViewCtrl', []).controller('ViewController', function($scope,Resumes) {

	Resumes.get()
		.success(function(resume){
			$scope.resume = resume;
		});
});