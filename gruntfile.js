module.exports = function(grunt) {
  grunt.initConfig({

    express: {
      server: {
        options: {
          bases: ['public'],
          livereload: true
        }
      }
    },

    copy: {
       dev: {
         files: [
           {src: 'bower_components/angular-complete/angular.js', dest:'public/javascript/libs/angular.js'},
           {src: 'bower_components/angular-github-adapter/angular-github-adapter', dest:'public/javascript/libs/angular-github-adapter'},
           {src: 'bower_components/jquery/dist/jquery.js', dest:'public/javascript/libs/jquery.js'},
           {src: 'bower_components/bootstrap/dist/css/bootstrap.css', dest:'public/styles/bootstrap.css'}
         ]
       }
    },
    clean:{
      bower: ['bower_components']
    }
  });


  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-express');

  grunt.registerTask('default', ['start']);
  grunt.registerTask('start', ['express', 'watch','express-keepalive']);
  grunt.registerTask('install', ['copy', 'clean']);


};