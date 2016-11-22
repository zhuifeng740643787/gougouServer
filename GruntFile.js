module.exports = function (grunt) {
  grunt.initConfig({
    server: {
       port: 9999,
       base: '.'
    },
    watch: {
      js: {
        files: [
          'app.js',
          'GruntFile.js'
        ],
        tasks: ['server'],
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
  // Default task(s).
  grunt.registerTask('default', ['watch']);
}