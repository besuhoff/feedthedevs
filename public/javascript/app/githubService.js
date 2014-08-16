(function() {
  'use strict';
  app.service('githubService', function (apiService) {
    var cache = {};

    this.getContributions = function (username, repo) {
      if (cache[username + '/' + repo] === undefined) {
        cache[username + '/' + repo] = apiService.all('github').all('repos').all(username).all(repo).all('pulls').getList();
      }
      return cache[username + '/' + repo];
    };

    this.getUserData = function () {
      return apiService.all('github').one('user').get();
    };
  });
})();