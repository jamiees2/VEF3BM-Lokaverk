angular.module('resumeApp', [
	'ui.router',
	'ngRoute', 
	'appRoutes',
	'markdown',
	'ResumeCtrl',
	'JobCtrl',
	'ResumeService',
	'AuthService',
	'JobService'
]);