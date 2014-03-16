app.service('authService', function($window, $location, settings){

  var secret,
      clientId = settings.githubClientId,
  //TODO: dynamically generate to differentiate dev and prod
      redirectUri = '',
      authUri = 'https://github.com/login/oauth/authorize?client_id=' + clientId + '&redirect_uri=' + redirectUri;

  this.goGithubOauth = function (){
    $window.location.href = authUri;
  }

  this.getSecret = function  (){
    if(!secret){
      secret = parseUrlParam($location.absUrl(), 'code');
    }
    return secret;
  }

  this.isAuth = function (){
    return !!this.getSecret();
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