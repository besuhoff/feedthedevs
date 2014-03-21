app.directive('featureInfo', function  (marksService){
  return {
    restrict: 'E',
    templateUrl: 'views/featureInfo.html',
    replace: true,
    link: function(scope){

     scope.userVote = null;
     marksService.getMarks(scope.logItem.id).then(function (marks){
       if(marks){
         scope.marks = marks;
       }
     });

     function afeed(feed){
       return (feed === 'pizza') ? 'tomato': 'pizza';
     }

     scope.setMark = function (feed){
       if(!scope.userVote){
         marksService.setMark(scope.logItem.id, feed).then(function(){
           scope.userVote = feed;
           scope.marks[feed]++;
         });
       }else{
         if(scope.userVote !== feed){
           marksService.setMark(scope.logItem.id, feed).then(function(){
             scope.userVote = feed;
             scope.marks[feed]++;
             scope.marks[afeed(feed)]--;
           });
         }
       }
     }

    }
  }
})