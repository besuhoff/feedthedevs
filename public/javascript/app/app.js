window.app = angular.module('feedthedevs',['ngRoute', 'ngSanitize','app-templates', 'restangular']);

app.config(function ($locationProvider) {
  $locationProvider.html5Mode(true).hashPrefix('#');
});

app.constant('settings', {
  githubClientId: 'd2374b99ef25d506e0be',
  apiUri: 'http://localhost:3000/api/',
  githubApiUri: 'https://api.github.com/'
});

app.config(function($routeProvider){
  $routeProvider.
    when('/auth', {
      templateUrl: 'views/auth.html',
      controller:  'authController'
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

})

