(function() {
  'use strict';
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
    var temp = url.match(param + '=([^&#]*)');
    // Will return null for non-existing values. Probably better than false.
    return temp && temp[1];
  }
})();
