angular.module('app-templates', ['views/featureInfo.html', 'views/init.html', 'views/main.html']);

angular.module("views/featureInfo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/featureInfo.html",
    "<div class=\"well col-sm-12 col-md-8 col-md-offset-2\">\n" +
    "  <div class=\"row user-row\">\n" +
    "    <div class=\"col-md-1\">\n" +
    "      <img class=\"img-circle\"\n" +
    "           src=\"https://lh5.googleusercontent.com/-b0-k99FZlyE/AAAAAAAAAAI/AAAAAAAAAAA/eu7opA4byxI/photo.jpg?sz=50\"\n" +
    "           alt=\"User Pic\">\n" +
    "    </div>\n" +
    "    <div class=\"col-md-8\">\n" +
    "      <strong>{{logItem.description}}</strong><br>\n" +
    "      <span class=\"text-muted\">{{logItem.username}}</span>\n" +
    "    </div>\n" +
    "\n" +
    "    <div class=\"col-md-3\">\n" +
    "      <button ng-click=\"doLike()\"><span class=\"emotion-icon emotion-yes\"></span> {{like}}</button>\n" +
    "      <button ng-click=\"doDislike()\"><span class=\"emotion-icon emotion-no\"></span>{{dislike}}</button>\n" +
    "      <!--<img src=\"yes.gif\">-->\n" +
    "      <!--<img src=\"no.gif\">-->\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("views/init.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/init.html",
    "<div class=\"scene\">\n" +
    "  <div class=\"input\" style=\"display: block;\">\n" +
    "    <input type=\"text\" placeholder=\"github 'user/repo' or url\">\n" +
    "  </div>\n" +
    "  <div class=\"plane\">\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("views/main.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/main.html",
    "<div class=\"container\">\n" +
    "\n" +
    "  <div class=\"center-block\">\n" +
    "\n" +
    "    <h1>Feed The Dev <small>for the moral of our devs</small></h1>\n" +
    "\n" +
    "    <h3>\n" +
    "      <a ng-href=\"https://github.com/{{gitProjectAuthor}}/{{gitProjectTitle}}\">{{gitProjectTitle}}</a>\n" +
    "      <small>(by <a ng-href=\"https://github.com/{{gitProjectAuthor}}\">{{gitProjectAuthor}})</a></small>\n" +
    "    </h3>\n" +
    "\n" +
    "    <feature-info ng-repeat=\"logItem in changelog\"></feature-info>\n" +
    "\n" +
    "  </div>\n" +
    "\n" +
    "</div>\n" +
    "");
}]);
