(function() {
  'use strict';
  app.controller('layoutController', function($rootScope, $location, authService) {
    authService.isAuth().catch(function() {
      $location.path('/auth');
    });

    $rootScope.logout = function() {
      authService.unAuth().then(function() {
        $location.path('/auth');
        $rootScope.logoutMessage = 'You have successfully signed out.'
      });
    };
  });
})();
