app.service('authService', function($window, $location, $q, $cookies, apiService, githubService, settings){
  'use strict';

  var token;

  this.goGithubOauth = function (){
    $window.location.href = settings.authUrl;
  };

  this.getToken = function(code){
    if (code) {
      return this.generateToken(code).then(function(access_token){
        token = access_token;
        apiService.setDefaultHeaders({'access_token':token});
        return token;
      });
    }

    if($cookies.access_token){
      token = $cookies.access_token;
      apiService.setDefaultHeaders({'access_token':token});
      return githubService.getUserData().then(function(response) { return response.id !== undefined ? token : false });
    } else {
      var defer = $q.defer();
      defer.resolve(false);
      return defer.promise;
    }
  };


  this.generateToken = function(code){
    return apiService.all('github').one('gettoken', code).get().then(
              function(data){
                return data.access_token;
              });
  };

  this.isAuth = function (){
    return this.getToken();
  };

});
