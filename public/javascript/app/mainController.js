app.controller('mainController', function($scope, $location, $routeParams, githubService, authService){

  authService.isAuth().then(function(token){
    if(!token){
      $location.path('/auth');
    }else{
      githubService
          .getReleases($routeParams.username, $routeParams.repo)
          .then(
          function(releases){
            $scope.changelog = releases;
            $scope.gitProjectTitle = $routeParams.repo;
            $scope.gitProjectAuthor = $routeParams.username;
          },
          function(response){
            alert('User or repository not found!');
            $route.reload();
          }
      );

      githubService.getUserData().then(function(data){
        $scope.userData = data;
      });
    }
  });
});