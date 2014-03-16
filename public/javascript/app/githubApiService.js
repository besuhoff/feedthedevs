app.factory('gitHubApiService', function(Restangular, settings, authService) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl('https://api.github.com/');
    RestangularConfigurer.setDefaultRequestParams(
        {
          //access_token: authService.getSecret()
          client_id: settings.githubClientId,
          client_secret: authService.getSecret()
        });
  });
});