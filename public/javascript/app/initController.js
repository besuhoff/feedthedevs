app.controller('initController', function($scope, $location, authService){

  if(!authService.isAuth()){
    $location.path('/auth');
  }

  $scope.goRepo = function (){
    $location.path('/' + $scope.repo);
  }
});