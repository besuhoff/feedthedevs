window.app = angular.module('feedthedev',['ngRoute', 'ngSanitize','app-templates', 'restangular']);

app.config(function ($locationProvider) {
//  $githubProvider.username('stevermeistertest');
//  $githubProvider.password('4tfdcm9TCgAL');
//  $githubProvider.authType('basic');
 // $githubProvider.token("dea1b9ce14e9ca80fbea02d6dd8e16331bce955e")
  $locationProvider.html5Mode(true).hashPrefix('#');
});

app.config(function($routeProvider){
  $routeProvider.
    when('/:username/:repo', {
      templateUrl: 'views/main.html',
      controller:  'mainController'
    }).
    otherwise({
      templateUrl: 'views/init.html',
      controller:  'mainController'
    });
});

app.run(function(Restangular){

})

