angular.module('LogoutCtrl', []).controller('LogoutController', function($scope,$http,$location,$rootScope,Auth) {
	Auth.logout().success(function(){
		$location.path('/');
	});
});