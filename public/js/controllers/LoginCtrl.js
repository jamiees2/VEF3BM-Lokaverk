angular.module('LoginCtrl', []).controller('LoginController', function($scope,$http,$location,$rootScope,Auth) {
	$scope.formData = {}
	$scope.submitForm = function(){
		Auth.login($scope.formData)
			.success(function(data){
				$location.path('/');
			});
	}
});