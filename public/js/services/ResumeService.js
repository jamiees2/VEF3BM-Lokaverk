angular.module('resumeService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Resumes', function($http) {
		return {
			get : function() {
				return $http.get('/api/resumes');
			},
			create : function(resumeData) {
				return $http.post('/api/resumes', resumeData);
			},
			delete : function(id) {
				return $http.delete('/api/resume/' + id);
			}
		}
	});