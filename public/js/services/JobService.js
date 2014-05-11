angular.module('JobService', [])

	// super simple service
	// each function returns a promise object 
	.factory('Jobs', function($http) {
		"use strict"
		return {
			get : function() {
				return $http.get('/api/v1/jobs');
			},
			getMyJobs: function(){
				return $http.get('/api/v1/me/jobs');
			},
			create : function(resumeData) {
				return $http.post('/api/v1/jobs', resumeData);
			},
			update: function(id, resumeData){
				return $http.put('/api/v1/job/' + id, resumeData);
			},
			del: function(id) {
				return $http.delete('/api/v1/job/' + id);
			},
			find: function(id){
				return $http.get('/api/v1/job/' + id );
			},
			createApplication: function(id,application){
				return $http.post('/api/v1/job/' + id + '/applications',application);
			}
		}
	});