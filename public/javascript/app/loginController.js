(function() {
  'use strict';
  app.controller('loginController', function($scope, $location, authService){

    $scope.hideForm = true;

    $scope.goGithubOauth = function() {
      return authService.goGithubOauth();
    };

    var code = $location.search()['code'];

    authService.authenticate(code).then(function(){
      delete $location.$$search.code;
      $location.path('/init');
    }).catch(function() {
      $scope.hideForm = false;
    });
  });
})();
