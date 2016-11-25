module.exports = function (grunt) {
  grunt.initConfig({
    nodemon: {
      dev: {
        script: 'app.js'
      }
    },
    watch: {
      js: {
        files: [
          'app.js',
          'GruntFile.js'
        ],
        tasks: ['nodemon'],
        options: {
          livereload: true,
          reload: true,
          atBegin: true
        }
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-watch');//监控文件改变
  grunt.loadNpmTasks('grunt-nodemon');//启动服务
  // Default task(s).
  grunt.registerTask('default', ['watch']);
}