app.service('marksService', function(apiService){
  this.getMarks = function (releaseId){
    return apiService.all('marks').one('releases', releaseId).get()
  }
});