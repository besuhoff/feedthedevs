(function() {
  'use strict';
  app.controller('mainController', function($location, authService) {
    var controller = this;

    authService.authenticate().catch(function() {
      $location.path('/auth');
    });

    this.logout = function() {
      authService.logout().then(function() {
        $location.path('/auth');
        controller.logoutMessage = 'You have successfully signed out.'
      });
    };
  });
})();
