window.app = angular.module('feedthedev',['pascalprecht.github-adapter']);

app.config(function ($githubProvider) {
  $githubProvider.username('stevermeistertest');
  $githubProvider.password('4tfdcm9TCgAL');
  $githubProvider.authType('basic');
});

app.controller('mainController', function($scope){
  $scope.changelog = changeLogMock;

});

app.directive('featureInfo', function  (){
  return {
    restrict: 'E',
    templateUrl: 'javascript/views/featureInfo.html',
    replace: true,
    link: function(scope){
      var rates = {
        like: Math.floor(Math.random() * 50),
        dislike: Math.floor(Math.random() * 50)
      };
      scope.like = rates.like;
      scope.dislike = rates.dislike;

      scope.doLike = function(){
        scope.like++;
        scope.dislike--;
      }

      scope.doDislike = function(){
        scope.dislike++;
        scope.like--;
      }
    }
  }
})



var changeLogMock = [
  {
    "userId": 0,
    "logId": 0,
    "description": "nostrud sit enim quis culpa tempor aliqua ipsum eu nulla",
    "username": "Galloway Hawkins"
  },
  {
    "userId": 1,
    "logId": 1,
    "description": "occaecat aliqua exercitation cillum adipisicing tempor sunt nostrud do eu",
    "username": "Jeanette Burton"
  },
  {
    "userId": 2,
    "logId": 2,
    "description": "culpa veniam pariatur quis nulla laboris quis eiusmod duis elit",
    "username": "Flossie Reyes"
  },
  {
    "userId": 3,
    "logId": 3,
    "description": "velit anim ullamco sint eu sit quis nisi magna ullamco",
    "username": "Hatfield Chambers"
  },
  {
    "userId": 4,
    "logId": 4,
    "description": "quis esse eiusmod amet et nisi nisi pariatur laborum eiusmod",
    "username": "Burch Pratt"
  }
];