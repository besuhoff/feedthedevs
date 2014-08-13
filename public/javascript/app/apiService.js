(function() {
  app.factory('apiService', function ($location, Restangular, settings) {
    return Restangular.withConfig(function (RestangularConfigurer) {
      RestangularConfigurer.setBaseUrl(settings.apiUrl);
    });
  });
})();