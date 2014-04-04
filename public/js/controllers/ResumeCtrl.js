angular.module('ResumeCtrl', []).controller('ResumeController', function($scope,$http,Resumes) {
	$scope.formData = {
		references: [{}],
		degrees: [{}],
		experience: [{}]
	};
	Resumes.get()
		.success(function(data){
			$scope.resumes = data;
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
		// if(!$.isEmptyObject($scope.formData)) {
		if(!$scope.data_exists){
			Resumes.create($scope.formData)
				.success(function(data){
					$scope.formData = {};
					$scope.resumes = data;
				});
		} else {
			Resumes.update($scope.formData._id,$scope.formData)
				.success(function(data) {
					$scope.formData = {};
					$scope.resumes = data;
					$scope.data_exists = false;
				});
		}
	}

	$scope.removeResume = function(resume_id){
		Resumes.delete(resume_id)
			.success(function(data){
				$scope.resumes = data;
			});
	}

	$scope.setResume = function(resume){
		$scope.formData = resume;
		$scope.data_exists = true;
	}

});
