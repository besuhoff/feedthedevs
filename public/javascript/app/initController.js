(function() {
  'use strict';
  app.controller('initController', function ($scope, $location, githubService, authService) {

    $scope.goRepo = function () {
      var parts = $scope.repo.split('/'),
          user = parts[0],
          repo = parts[1];

      githubService
          .getContributions(user, repo)
          .then(function () {
            $location.path('/' + $scope.repo);
          })
          .catch(function() {
            alert('User or repository not found!');
          });
    };
  });
})();
