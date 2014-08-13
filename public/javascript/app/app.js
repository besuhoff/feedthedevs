var app = angular.module('feedthedevs',['ngRoute', 'ngSanitize', 'ngCookies', 'app-templates', 'restangular']);

app.config(function ($locationProvider, RestangularProvider) {
  $locationProvider.html5Mode(true).hashPrefix('#');
  RestangularProvider.setMethodOverriders(["put", "post"]);
});

app.constant('settings', {
  apiUrl: '/api/',
  authUrl: '/api/github/oauth'
});

app.config(function($routeProvider){
  $routeProvider.
    when('/auth', {
      templateUrl: 'views/auth.html',
      controller:  'authController'
    }).
    when('/unauth', {
      templateUrl: 'views/auth.html',
      controller:  'unauthController'
    }).
    when('/auth/:code', {
      templateUrl: 'views/auth.html',
      controller:  'authController'
    }).
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

});

