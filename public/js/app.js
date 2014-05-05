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
]).run(function(Auth,$rootScope,$state){
	$rootScope.$state = $state;
	Auth.isLoggedIn(); // Get the user on startup
});