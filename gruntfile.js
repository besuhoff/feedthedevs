var config = require('./config.defaults.js'),
    extend = require('extend');

try {
  extend(config, require('./config'))
} catch(e) {

}

module.exports = function(grunt) {

  grunt.initConfig({

    migrate: {
      options: {
        env: {
          DATABASE_URL: config.dbConnectParams
        },
        verbose: true
      }
    },

    express: {
      server: {
        options: {
          server: 'server.js',
          port: Number(process.env.PORT || 3000)
        }
      }
    },

    open: {
      all: {
        path: 'http://localhost:3000',
        app: 'Google Chrome'
      }
    },

    copy: {
       dev: {
         files: [
           {src: 'bower_components/angular/angular.js', dest:'public/javascript/libs/angular.js'},
           {src: 'bower_components/angular-cookies/angular-cookies.js', dest:'public/javascript/libs/angular-cookies.js'},
           {src: 'bower_components/angular-route/angular-route.js', dest:'public/javascript/libs/angular-route.js'},
           {src: 'bower_components/angular-sanitize/angular-sanitize.js', dest:'public/javascript/libs/angular-sanitize.js'},
           {src: 'bower_components/restangular/dist/restangular.js', dest:'public/javascript/libs/restangular.js'},
           {src: 'bower_components/jquery/dist/jquery.min.js', dest:'public/javascript/libs/jquery.min.js'},
           {src: 'bower_components/lodash/dist/lodash.min.js', dest:'public/javascript/libs/lodash.min.js'},
           {src: 'bower_components/js-base64/base64.min.js', dest:'public/javascript/libs/base64.min.js'},
           {src: 'bower_components/bootstrap/dist/css/bootstrap.css', dest:'public/styles/bootstrap.css'}
         ]
       }
    },
    clean:{
      bower: ['bower_components']
    },
    notify: {
      server: {
        options: {
          message: 'Server is ready!'
        }
      }
    },
    html2js: {
      options: {
        base: 'public/javascript/app/',
        module: 'app-templates'
      },
      main: {
        src: ['public/javascript/app/views/**/*.html'],
        dest: 'public/javascript/app/templates.js'
      }
    },
    watch: {
      templates: {
        files:['public/javascript/app/views/**/*.html'],
        tasks: ['html2js']
      }
    },
    ngmin: {
      directives: {
        cwd: 'public/javascript/app',
        src: ['contributionInfoDirective.js'],
        dest: 'contributionInfoDirective.js'
      }
    },
    jshint: {
      all: ['Gruntfile.js', 'public/javascript/app/**/*.js']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-express');
  grunt.loadNpmTasks('grunt-open');
  grunt.loadNpmTasks('grunt-notify');
  grunt.loadNpmTasks('grunt-html2js');
  grunt.loadNpmTasks('grunt-ngmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-db-migrate');

  grunt.registerTask('default', ['start']);
  grunt.registerTask('start', []);
  grunt.registerTask('dev', ['express', 'notify', 'open', 'watch','express-keepalive']);
  grunt.registerTask('install', ['copy', 'clean', 'html2js', 'migrate:up']);


};
