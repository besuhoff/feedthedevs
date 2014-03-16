app.controller('mainController', function($scope, $routeParams, githubService){
  $scope.gitProjectTitle = $routeParams.repo;
  $scope.gitProjectAuthor = $routeParams.username;
  githubService.getReleases('mgonto', 'restangular')
    .then(
        function(releases){
          $scope.changelog = releases;
        }
    );

  githubService.getUserData().then(function(data){
    console.log(data);
  })
});