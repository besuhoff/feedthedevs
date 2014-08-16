(function() {
  'use strict';
  app.directive('contributionInfo', function  (marksService){
    return {
      restrict: 'E',
      templateUrl: 'views/contributionInfo.html',
      replace: true,
      link: function(scope){

       scope.userVote = null;
       marksService.getMarks(scope.logItem.id).then(function (marks){
         if(marks){
           scope.marks = marks;
           scope.userVote = marks.userVote;
         }
       });

       function afeed(feed) {
         return (feed === 'pizza') ? 'tomato': 'pizza';
       }

       scope.setMark = function(feed) {
         marksService.setMark(scope.logItem.id, feed).then(function(data) {
           if(data.error) {
             window.alert(data.error);
             return;
           }
           if(scope.userVote && scope.userVote !== feed) {
             scope.marks[afeed(feed)]--;
           }
           scope.marks[feed]++;
           scope.userVote = feed;
         });
       };

      }
    };
  });
})();