app.service('authService', function($window, $location, $q, $cookies, apiService, gitHubApiService,settings){

  var code,
      clientId = settings.githubClientId,
      token,
  //TODO: dynamically generate to differentiate dev and prod
      redirectUri = 'http://' + $location.host() + ':'+ $location.port() + '/auth',
      authUri = 'https://github.com/login/oauth/authorize?client_id=' + clientId + '&redirect_uri=' + redirectUri;

  this.goGithubOauth = function (){
    $window.location.href = authUri;
  }

  this.getToken = function  (code){
    var defer = $q.defer();
    if(token){
      defer.resolve(token);
      return defer.promise;
    }
    if($cookies.access_token){
      token = $cookies.access_token;
      apiService.setDefaultHeaders({'access_token':token});
      gitHubApiService.setDefaultRequestParams({'access_token':token});
      defer.resolve(token);
      return defer.promise;
    }

    return promise = this.generateToken(code).then(function(access_token){
      token = access_token;
      apiService.setDefaultHeaders({'access_token':token});
      gitHubApiService.setDefaultRequestParams({'access_token':token});
      return token;
    });
  }


  this.generateToken = function  (code){
    return apiService.all('github').one('gettoken', code).get().then(
              function(data){
                return data.access_token;
              });
  }

  this.isAuth = function (){
    return !!token;
  }

});
