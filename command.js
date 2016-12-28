'use strict'

//加载models
const fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')
var db = 'mongodb://localhost/gougou-app'
mongoose.Promise = require('bluebird')
mongoose.connect(db)
global._global = require('./app/common/global')
var rootPath = __dirname
var models_path = path.join(__dirname, '/app/models')
var loadModels = function(modelPath) {
  fs
    .readdirSync(modelPath)
    .forEach(function(file) {
      var filePath = path.join(modelPath, '/' + file)
      var stat = fs.statSync(filePath) // 文件状态
      if (stat.isFile()) {
        if (/(.*)\.(js|coffee)/.test(file)) {
          require(filePath)
        }
      } else if (stat.isDirectory()) {
        loadModels(filePath)
      }
    })
}

loadModels(models_path)


var command = process.argv[2]
if (process.argv.length == 2 || command == '-h' || command == '--help') {
  var text = fs.readFileSync('./job/help.text', 'utf8')
  console.log(text)
  exit()
}
var jobPath = path.join(rootPath, '/job')
var City = mongoose.model('City')
switch (command) {
  case '--city':
    var city = require(path.join(jobPath, '/crawl/city'))
    city.add()
    break
  case '--category':
    var category = require(path.join(jobPath, '/crawl/category'))
    category.add()
    break
  case '--condition':
    var condition = require(path.join(jobPath, '/crawl/condition'))
    var category = process.argv[3] ? process.argv[3] : '__all__'
    var startTime= process.argv[4] ? process.argv[4] : 0
    condition.batch(category, startTime)
    break
}








