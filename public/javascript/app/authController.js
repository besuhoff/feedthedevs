app.controller('authController', function($scope, $location, $cookies, authService){

  $scope.goGithubOauth = authService.goGithubOauth;

  var code = parseUrlParam($location.absUrl(), 'code');

  if(code || $cookies.access_token){
    authService.getToken(code).then(function (token){
        if(token){
          $cookies.access_token = token;
          $location.path('/init');
        }
    });
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