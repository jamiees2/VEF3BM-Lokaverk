//Resume service
angular.module('ResumeService', [])
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