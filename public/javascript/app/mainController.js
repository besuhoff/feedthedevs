app.controller('mainController', function($scope, $location, $routeParams, githubService, authService){

  authService.isAuth().then(function(token){
    if(!token){
      $location.path('/auth');
    }else{
      $scope.gitProjectTitle = $routeParams.repo;
      $scope.gitProjectAuthor = $routeParams.username;
      githubService.getReleases($routeParams.username, $routeParams.repo)
          .then(
          function(releases){
            $scope.changelog = releases;
          }
      );

      githubService.getUserData().then(function(data){
        $scope.userData = data;
      })
    }
  });
});