(function() {
  'use strict';
  app.controller('unauthController', function($scope, $cookies, authService, apiService) {
    $scope.goGithubOauth = authService.goGithubOauth;

    delete $cookies.access_token;
    apiService.setDefaultHeaders({});
    $scope.message = 'You have successfully logged out.';
  });
})();