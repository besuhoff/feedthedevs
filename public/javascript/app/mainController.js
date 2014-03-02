app.controller('mainController', function($scope, $routeParams, Restangular){
  $scope.gitProjectTitle = $routeParams.repo;
  $scope.gitProjectAuthor = $routeParams.username;
  //https://api.github.com/repos/mgonto/restangular/releases
  Restangular.one('repos', $routeParams.username).one($routeParams.repo).getList('releases').then(
      function(releases){
        debugger
        $scope.changelog = releases;
      }
  );
});