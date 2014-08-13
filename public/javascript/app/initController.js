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
      githubService
          .getReleases.apply(githubService, $scope.repo.split('/'))
          .then(
          function () {
            $location.path('/' + $scope.repo);
          },
          function () {
            alert('User or repository not found!');
          }
      );
    };
  });
})();