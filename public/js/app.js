angular.module('resumeApp', [
	'ui.router',
	'ui.gravatar',
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
	$rootScope.$stateParams = $stateParams; //Save the state and stateParams to the scope, so it is accessible within views
	Auth.isLoggedIn(); // Get the user on startup
});