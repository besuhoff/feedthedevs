app.service('githubService', function (apiService){
  var cache = {};

  this.getReleases = function (username, repo){
    if (cache[username + '/' + repo] === undefined) {
      cache[username + '/' + repo] = apiService.all('github').all('repos').all(username).all(repo).all('releases').getList();
    }
    return cache[username + '/' + repo];
  };

  this.getUserData = function (){
    return apiService.all('github').one('user').get();
  };
});