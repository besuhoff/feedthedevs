app.controller('mainController', function($scope, $routeParams){
  $scope.changelog = changeLogMock;
  $scope.gitProjectTitle = $routeParams.repo;
  $scope.gitProjectAuthor = $routeParams.username;
});