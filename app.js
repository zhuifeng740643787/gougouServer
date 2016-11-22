'use strict'

//加载models
var fs = require('fs')
var path = require('path')
var mongoose = require('mongoose')
var db = 'mongodb://localhost/gougou-app'
mongoose.Promise = require('bluebird')
mongoose.connect(db)

var models_path = path.join(__dirname, '/app/models')
var walk = function(modelPath) {
  fs
  	.readdirSync(modelPath)
  	.forEach(function(file){
  		var filePath = path.join(modelPath, '/' + file)
  		var stat = fs.statSync(filePath) // 文件状态
  		if(stat.isFile()) {
  			if(/(.*)\.(js|coffee)/.test(file)){
  				require(filePath)
  			}
  		} else if(stat.isDirectory()){
  			walk(filePath)
  		}
  	})
}

walk(models_path)

var koa = require('koa')
var logger = require('koa-logger')
var session = require('koa-session')
var bodyparser = require('koa-bodyparser')
var router = require('koa-router')()

var app = koa()

app.keys = ['gougou'] //session加密用的key
app.use(logger())
app.use(session(app))
app.use(bodyparser())


var router = require('./app/config/routes')()

app
  .use(router.routes())
  .use(router.allowedMethods())


app.listen(9999)

console.log('listen 9999')
