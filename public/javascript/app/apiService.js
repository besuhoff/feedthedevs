app.factory('apiService', function(Restangular, settings) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl(settings.apiUri);
  });
});