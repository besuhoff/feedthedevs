app.controller('initController', function($scope, $location, githubService, authService){

  if (!authService.isAuth()) {
    $location.path('/auth');
  }

  $scope.goRepo = function() {
    githubService
        .getReleases.apply(githubService, $scope.repo.split('/'))
        .then(
        function(){
          $location.path('/' + $scope.repo);
        },
        function(){
          alert('User or repository not found!');
        }
    );
  };
});