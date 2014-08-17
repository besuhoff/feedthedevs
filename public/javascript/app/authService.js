(function() {
  'use strict';
  app.service('authService', function ($rootScope, $window, $location, $q, $cookies, apiService, githubService, settings) {

    var token;

    this.goGithubOauth = function () {
      $window.location.href = settings.authUrl;
    };

    this.isAuth = function (code) {
      var saveToken = function(access_token) {
        token = access_token;
        $cookies.access_token = token;
        apiService.setDefaultHeaders({'access_token': token});
        return githubService.getUserData().then(function(data) {
          if (data.id !== undefined) {
            $rootScope.userData = data;
            return data;
          } else {
            return $q.reject(false);
          }
        });
      };

      if (code) {
        return this.generateToken(code).then(saveToken);
      }

      if ($cookies.access_token) {
        return saveToken($cookies.access_token);
      } else {
        return $q.reject(false);
      }
    };

    this.unAuth = function() {
      token = undefined;
      delete $cookies.access_token;
      apiService.setDefaultHeaders({});
      $rootScope.userData = {};
      return $q.when(true);
    };

    this.generateToken = function (code) {
      return apiService.all('github').one('gettoken', code).get().then(
          function (data) {
            return data.access_token ? data.access_token : $q.reject(false);
          });
    };
  });
})();
