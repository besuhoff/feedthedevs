window.app = angular.module('feedthedev',['ngRoute', 'ngSanitize','app-templates', 'restangular']);

app.config(function ($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('#');
});

app.config(function(RestangularProvider) {
  RestangularProvider.setBaseUrl('http://localhost:3000/api/');
  RestangularProvider.setMethodOverriders(["put", "patch"]);
});

app.config(function($routeProvider){
  $routeProvider.
    when('/:username/:repo', {
      templateUrl: 'views/main.html',
      controller:  'mainController'
    }).
    otherwise({
      templateUrl: 'views/init.html',
      controller:  'initController'
    });
});

app.run(function(){

})

