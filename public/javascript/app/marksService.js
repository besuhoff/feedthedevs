app.service('marksService', function(apiService){
  this.getMarks = function (releaseId){
    return apiService.all('marks').one('releases', releaseId).get()
  }
  this.setMark = function (releaseId, mark){
    var releases = apiService.all('marks').all('releases'),
        newMark = {
                    release_id : releaseId,
                    feed: mark
                  };
    return releases.post(newMark);
  }
});