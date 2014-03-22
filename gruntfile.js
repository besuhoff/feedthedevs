module.exports = function(grunt) {

  var dbs = {
    local: 'postgres://postgres:DrDkdB3tNcf8@localhost/feedthedevs',
    local_mysql: 'mysql://root:@localhost/feedthedevs',
    heroku: 'postgres://gfdjmxldrvrqje:GsbiS8_p-GOFuFUbbrwSWwB5bd@ec2-23-23-81-171.compute-1.amazonaws.com:5432/da4gu7uk0qu1eh'
  };

  grunt.initConfig({

    migrate: {
      options: {
        env: {
          DATABASE_URL: dbs['heroku']
        },
        verbose: true
      }
    },

    express: {
      server: {
        options: {
          server: 'server.js',
          port: Number(process.env.PORT || 3000)
          //livereload: true
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
        src: ['featureInfoDirective.js'],
        dest: 'featureInfoDirective.js'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-clean');
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