angular.module('ResumeService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Resumes', function($http) {
		return {
			get : function() {
				return $http.get('/api/v1/user/resume');
			},
			create : function(resumeData) {
				return $http.post('/api/v1/user/resume', resumeData);
			},
			update : function(resumeData) {
				return $http.post('/api/v1/user/resume', resumeData);
			},
			getUser: function(id){
				return $http.get('/api/v1/user/'+id+'/resume');
			}
		}
	});