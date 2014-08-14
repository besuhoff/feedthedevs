(function() {
  'use strict';
  app.controller('initController', function ($scope, $location, githubService, authService) {

    authService.isAuth().then(function (token) {
      if (!token) {
        $location.path('/auth');
      }
    });

    githubService.getUserData().then(function (data) {
      $scope.userData = data;
    });

    $scope.goRepo = function () {
      var parts = $scope.repo.split('/'),
          user = parts[0],
          repo = parts[1];

      githubService
          .getReleases(user, repo)
          .then(function () {
            $location.path('/' + $scope.repo);
          })
          .catch(function() {
            alert('User or repository not found!');
          });
    };
  });
})();
