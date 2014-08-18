(function() {
  'use strict';
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
        templateUrl: 'views/login.html',
        controller:  'loginController'
      }).
      when('/auth/:code', {
        templateUrl: 'views/login.html',
        controller:  'loginController'
      }).
      when('/:username/:repo', {
        templateUrl: 'views/contributions.html',
        controller:  'contributionsController'
      }).
      otherwise({
        templateUrl: 'views/init.html',
        controller:  'initController'
      });
  });

  app.run(function(){

  });

  window.app = app;
})();