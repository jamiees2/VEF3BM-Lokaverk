angular.module('resumeApp', [
	'ui.router',
	'ngRoute', 
	'appRoutes',
	'markdown',
	'ResumeCtrl',
	'JobCtrl',
	'JobApplicationCtrl',
	'ResumeService',
	'AuthService',
	'JobService'
]).run(function(Auth,$rootScope,$state, $stateParams){
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
	Auth.isLoggedIn(); // Get the user on startup
});