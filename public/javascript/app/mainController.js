app.controller('mainController', function($scope, $location, $routeParams, githubService, authService){

  if(!authService.isAuth()){
    $location.path('/auth');
  }

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
});