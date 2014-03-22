app.factory('apiService', function($location, Restangular, settings) {
  return Restangular.withConfig(function(RestangularConfigurer) {
    RestangularConfigurer.setBaseUrl('http://' + $location.host() + settings.apiPath);
  });
});