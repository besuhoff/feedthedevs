(function() {
  'use strict';
  app.directive('controlPanel', function() {
    return {
      restrict: 'E',
      templateUrl: 'views/controlPanel.html',
      replace: true
    };
  });
})();