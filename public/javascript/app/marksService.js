(function() {
  'use strict';
  app.service('marksService', function(apiService) {
    var contributions = apiService.all('marks').all('contributions');

    this.getMarks = function(contribId) {
      return contributions.get(contribId);
    };

    this.setMark = function(contribId, mark) {
      var newMark = {
                      contrib_id : contribId,
                      feed: mark
                    };
      return contributions.post(newMark);
    };
  });
})();
