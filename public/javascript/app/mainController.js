(function() {
  'use strict';
  app.controller('mainController', function ($scope, $location, $routeParams, githubService, authService) {

    githubService
        .getContributions($routeParams.username, $routeParams.repo)
        .then(
        function (contributions) {
          $scope.changelog = contributions;
          $scope.gitProjectTitle = $routeParams.repo;
          $scope.gitProjectAuthor = $routeParams.username;
        },
        function () {
          alert('User or repository not found!');
          $location.path('/init');
        }
    );
  });
})();