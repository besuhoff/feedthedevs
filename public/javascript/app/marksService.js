(function() {
  'use strict';
  app.service('marksService', function(apiService) {
    var releases = apiService.all('marks').all('releases');

    this.getMarks = function(releaseId) {
      return releases.get(releaseId);
    };

    this.setMark = function(releaseId, mark) {
      var newMark = {
                      release_id : releaseId,
                      feed: mark
                    };
      return releases.post(newMark);
    };
  });
})();
