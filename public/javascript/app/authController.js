app.controller('authController', function($scope, $location, authService){

  if(authService.isAuth()){
    $location.path('/init');
  }

  $scope.goGithubOauth = function (){
    authService.goGithubOauth();
  }

});