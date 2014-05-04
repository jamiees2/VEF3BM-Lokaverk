angular.module('ResumeCtrl', []).controller('ResumeController', function($scope,$http,Resumes,$location) {
	$scope.formData = {
		references: [{}],
		degrees: [{}],
		experience: [{}]
	};
	Resumes.get()
		.success(function(data){
			$scope.resume = data;
			$scope.formData = data;
		});
	$scope.addReference = function(){
		$scope.formData.references.push({});
	}
	$scope.removeReference = function(index){
		$scope.formData.references.splice(index,1);
	}

	$scope.addDegree = function(){
		$scope.formData.degrees.push({});
	}

	$scope.removeDegree = function($index) {
		$scope.formData.degrees.splice($index,1);
	}

	$scope.addWork = function(){
		$scope.formData.experience.push({});
	}

	$scope.removeWork = function($index) {
		$scope.formData.experience.splice($index,1);
	}

	$scope.submitResume = function($valid){
		Resumes.create($scope.formData)
			.success(function(data){
				// $scope.formData = {};
				$scope.resume = data;
			});
		$location.path('resume')
	}

});
