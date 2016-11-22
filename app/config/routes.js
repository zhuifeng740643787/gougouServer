'use strict'

var Router = require('koa-router')
var AppCtrl = require('../controllers/app')
var UserCtrl = require('../controllers/user')

module.exports = function() {
	var router = new Router({
		prefix: '/api'
	})
	
  router.get('/creations', AppCtrl.creations)
	router.get('/creations/add', AppCtrl.add)
	router.get('/u/signup', UserCtrl.signup)

	return router
}

