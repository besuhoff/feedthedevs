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
      code = parseUrlParam($location.absUrl(), 'code');
    }
    return Restangular.all('github').one('gettoken', code).get();
    //access_token
  }

  this.isAuth = function (){

  }

});


//TODO: think how to make github callback html5-url friendly
function parseUrlParam(url, param){
  var temp = url.match(param + '=(\\w*)');
  if(!temp || !temp[1]){
    return false;
  }
  return temp[1];
}