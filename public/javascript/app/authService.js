(function() {
  'use strict';
  app.service('authService', function ($rootScope, $window, $location, $q, $cookieStore, apiService, githubService, settings) {

    this.goGithubOauth = function () {
      $window.location.href = settings.authUrl;
    };

    this.authenticate = function (code) {
      var saveToken = function(access_token) {
        $cookieStore.put('access_token', access_token);
        apiService.setDefaultHeaders({'access_token': access_token});
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

      if ($cookieStore.get('access_token')) {
        return saveToken($cookieStore.get('access_token'));
      } else {
        return $q.reject(false);
      }
    };

    this.logout = function() {
      $cookieStore.remove('access_token');
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
