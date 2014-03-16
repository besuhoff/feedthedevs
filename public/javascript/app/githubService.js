app.service('githubService', function (gitHubApiService){
  this.getReleases = function (username, repo){
    return gitHubApiService.all('repos').all(username).all(repo).all('releases').getList();
  }

  this.getUserData = function (){
    return gitHubApiService.one('user').get()
  }
});