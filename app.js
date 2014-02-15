window.app = angular.module('feedthedev',[]);

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
});