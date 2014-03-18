app.controller('authController', function($scope, $location, authService){

  $scope.goGithubOauth = function (){
    authService.goGithubOauth();
  }

  authService.getToken().then(function (data){
    debugger
  }

  );

});