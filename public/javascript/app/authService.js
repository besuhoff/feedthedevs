app.service('authService', function($window, $location, $q, apiService, gitHubApiService,settings){

  var code,
      clientId = settings.githubClientId,
      token,
  //TODO: dynamically generate to differentiate dev and prod
      redirectUri = '',
      authUri = 'https://github.com/login/oauth/authorize?client_id=' + clientId + '&redirect_uri=' + redirectUri;

  this.goGithubOauth = function (){
    $window.location.href = authUri;
  }

  this.getToken = function  (code){
    return apiService.all('github').one('gettoken', code).get().then(
              function(data){
                token = data.access_token;
                apiService.setDefaultHeaders({'access_token':token});
                gitHubApiService.setDefaultRequestParams({'access_token':token});
                return token;
              });
  }

  this.isAuth = function (){
    return !!token;
  }

});
