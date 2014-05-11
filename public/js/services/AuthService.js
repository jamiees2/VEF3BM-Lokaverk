//User login/logout service
angular.module('AuthService',[]).service( 'Auth', function($http,$rootScope) {
  return {
    login: function(credentials) {
    	return $http.post('/api/v1/user/login',credentials)
			.success(function(data){
				$rootScope.user = data;
			});
    },
    logout: function() { 
    	return $http.get('/api/v1/user/logout')
			.success(function(){
				$rootScope.user = null;
			});
    },
    signup: function(data){
        return $http.post('/api/v1/user/signup',data)
            .success(function(data){
                $rootScope.user = data;
            })
    },
    isLoggedIn: function() { 
    	return $http.get('/api/v1/user')
			.success(function(data){
				$rootScope.user = data;
			});
    },
    currentUser: function() { return $rootScope.user; },
    getUser: function(id) {
      return $http.get('/api/v1/user/' + id);
    }
  };
});