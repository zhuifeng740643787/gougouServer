module.exports = function (grunt) {
  grunt.initConfig({
    nodemon: {
      app: {
        script: 'app.js'
      },
      command: {
        script: 'command.js'
      }
      
    },
    watch: {
      app: {
        files: [
          'app.js',
          'app/*',
          'GruntFile.js'
        ],
        tasks: ['nodemon:app'],
        options: {
          livereload: true,
          reload: true,
          atBegin: true
        }
      },
      command: {
        files: [
          'command.js',
          'job/*',
          'GruntFile.js'
        ],
        tasks: ['nodemon:command'],
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
  grunt.registerTask('default', ['watch:app']);
  grunt.registerTask('command', ['watch:command']);
}