module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> */\n'
      },
      build: {
        src: 'src/<%= pkg.name %>.js',
        dest: 'build/<%= pkg.name %>.min.js'
      }
    },
    simplemocha: {
      options: {
        globals: ['should', 'assert'],
        timeout: 3000,
        ignoreLeaks: false,
      },

      all: { src: 'test/*.js' }
    },
    watch:{
      all:{
        files:['src/*', 'test/*.js'],
        tasks:['test']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('default', ['simplemocha']);
  grunt.registerTask('test', 'simplemocha:all');

};
