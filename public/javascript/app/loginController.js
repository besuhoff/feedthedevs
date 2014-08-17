(function() {
  'use strict';
  app.controller('loginController', function($scope, $location, authService){

    $scope.hideForm = true;

    $scope.goGithubOauth = function() {
      return authService.goGithubOauth();
    };

    var code = parseUrlParam($location.absUrl(), 'code');

    authService.isAuth(code).then(function(){
      delete $location.$$search.code;
      $location.path('/init');
    }).catch(function() {
      $scope.hideForm = false;
    });
  });

  //TODO: think how to make github callback html5-url friendly
  function parseUrlParam(url, param){
    var temp = url.match(param + '=([^&#]*)');
    // Will return null for non-existing values. Probably better than false.
    return temp && temp[1];
  }
})();
