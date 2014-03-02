app.controller('initController', function($scope, $location){

  $scope.goRepo = function (){
    $location.path('/' + $scope.repo);
  }
});