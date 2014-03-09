app.controller('mainController', function($scope, $routeParams, Restangular, marksService){
  $scope.gitProjectTitle = $routeParams.repo;
  $scope.gitProjectAuthor = $routeParams.username;
  Restangular.allUrl('releases','https://api.github.com/repos/mgonto/restangular/releases').getList().then(
      function(releases){
        $scope.changelog = releases;
      }
  );
debugger
  marksService.getMarks().then(function  (marks){
    console.log(marks);
  })
});