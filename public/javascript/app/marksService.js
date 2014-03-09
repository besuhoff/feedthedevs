app.service('marksService', function(Restangular){
  this.getMarks = function (releaseId){
    return Restangular.all('marks').one('releases', releaseId).get()
  }
});