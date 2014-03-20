app.service('authService', function($window, $location, Restangular, settings){

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
    if(!code){
      return ;
    }
    return Restangular.all('github').one('gettoken', code).get().then(
        function(data){
          Restangular.setDefaultHeaders({'access_token':data.access_token})
        }
    );
  }

  this.isAuth = function (){

  }

});
