window.app = angular.module('feedthedev',['app-templates','pascalprecht.github-adapter']);

app.config(function ($githubProvider) {
  $githubProvider.username('stevermeistertest');
  $githubProvider.password('4tfdcm9TCgAL');
  $githubProvider.authType('basic');
});

app.run(function($github){
  $github.getRepo('stevermeister', 'feedthedev').then(function(data){
    data.contents().then(function(d){
      debugger
    })
  });
})

