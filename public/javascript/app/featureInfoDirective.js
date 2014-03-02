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