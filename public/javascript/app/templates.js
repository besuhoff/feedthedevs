angular.module('app-templates', ['views/featureInfo.html', 'views/init.html', 'views/main.html']);

angular.module("views/featureInfo.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/featureInfo.html",
    "<div class=\"well col-sm-12 col-md-8 col-md-offset-2\">\n" +
    "  <div class=\"row user-row\">\n" +
    "    <div class=\"col-md-2\">\n" +
    "      <img class=\"img-circle\"\n" +
    "           src=\"{{logItem.author.avatar_url}}\"\n" +
    "           alt=\"User Pic\">\n" +
    "      <div>\n" +
    "        <span class=\"emotion-icon emotion-yes\" ng-click=\"doLike()\">{{like}}</span>\n" +
    "        <span class=\"emotion-icon emotion-no\" ng-click=\"doDislike()\">{{dislike}}</span>\n" +
    "      </div>\n" +
    "    </div>\n" +
    "    <div class=\"col-md-8\">\n" +
    "      <strong ng-bind-html=\"logItem.body|nl2br\"></strong><br>\n" +
    "      <span class=\"text-muted\">{{logItem.author.login}}</span>\n" +
    "    </div>\n" +
    "  </div>\n" +
    "</div>");
}]);

angular.module("views/init.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("views/init.html",
    "<div class=\"scene\">\n" +
    "  <div class=\"input\" style=\"display: block;\">\n" +
    "    <form ng-submit=\"goRepo()\">\n" +
    "      <input ng-model=\"repo\" type=\"text\" placeholder=\"github 'user/repo'\">\n" +
    "    </form>\n" +
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
    "\n" +
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
