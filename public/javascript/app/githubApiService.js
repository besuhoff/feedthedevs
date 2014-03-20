app.factory('gitHubApiService', function(Restangular, settings) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl(settings.githubApiUri);
  });
});