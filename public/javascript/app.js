window.app = angular.module('feedthedev',['pascalprecht.github-adapter']);

app.config(function ($githubProvider) {
  $githubProvider.username('stevermeistertest');
  $githubProvider.password('4tfdcm9TCgAL');
  $githubProvider.authType('basic');
});

app.controller('mainController', function($scope){
  $scope.changelog = [
    {userId: 37,
     logId: 11128,
     description: 'lorem ipsum'
    },
    {userId: 49,
      logId: 13328,
      description: 'lorem ipsum2'
    }
  ];

  $scope.getUserName = function(id){
    return 'Jonh Doe';
  }
});

app.directive('featureInfo', function  (){
  return {
    restrict: 'E',
    templateUrl: 'javascript/views/featureInfo.html',
    replace: true,
    link: function(){

    }
  }
})