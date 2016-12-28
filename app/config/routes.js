'use strict'

var Router = require('koa-router')
var VerifyCodeCtrl = require('../controllers/verify-code')
var UserCtrl = require('../controllers/user')
var ConditionCtrl = require('../controllers/condition')
var CommentCtrl = require('../controllers/comment')
var CityCtrl = require('../controllers/city')
var UploadCtrl = require('../controllers/upload')
var MiddleWare = require('../controllers/MiddleWare')

module.exports = function() {
	var router = new Router({
		prefix: '/api'
	})

  //文件上传
  router.post('/upload/image', MiddleWare.checkAccessToken, UploadCtrl.image)
  router.post('/upload/audio', MiddleWare.checkAccessToken, UploadCtrl.audio)
  router.post('/upload/video', MiddleWare.checkAccessToken, UploadCtrl.video)
  //验证码
  router.get('/verify/code/image', VerifyCodeCtrl.image)//图形验证码
  router.get('/verify/code/sms', VerifyCodeCtrl.sms) //短信验证码
  //用户
  router.post('/user/register', UserCtrl.register)
  router.post('/user/login', UserCtrl.login)
  router.get('/user/info', MiddleWare.checkAccessToken, UserCtrl.info)
  router.get('/user/conditions', MiddleWare.checkAccessToken, UserCtrl.conditions) //用户发布过的
  router.get('/user/collects', MiddleWare.checkAccessToken, UserCtrl.collects) // 用户收藏
  router.get('/user/fans', MiddleWare.checkAccessToken, UserCtrl.fans) // 用户粉丝
  router.get('/user/attentions', MiddleWare.checkAccessToken, UserCtrl.attentions) // 用户关注列表
  router.get('/user/attention/add', MiddleWare.checkAccessToken, UserCtrl.addAttention) // 用户关注
  //状态
  router.post('/condition/add', MiddleWare.checkAccessToken, ConditionCtrl.add)
  router.get('/condition/list', ConditionCtrl.list)
  router.get('/condition/detail', ConditionCtrl.detail)
  router.get('/condition/collect', MiddleWare.checkAccessToken, ConditionCtrl.collect)
  //评论
  router.post('/comment/add', MiddleWare.checkAccessToken, CommentCtrl.add)
  router.get('/comment/list', CommentCtrl.list)
  router.get('/comment/detail', CommentCtrl.detail)
  router.get('/comment/vote', MiddleWare.checkAccessToken, CommentCtrl.vote) //点赞

  router.get('/city/list', CityCtrl.list)



	return router
}

