'use strict'

var Router = require('koa-router')
var VerifyCodeCtrl = require('../controllers/verify-code')
var UserCtrl = require('../controllers/user')
var ConditionCtrl = require('../controllers/condition')
var CommentCtrl = require('../controllers/comment')

module.exports = function() {
	var router = new Router({
		prefix: '/api'
	})

  //验证码
  router.get('/verify/code/image', VerifyCodeCtrl.image)//图形验证码
  router.get('/verify/code/sms', VerifyCodeCtrl.sms) //短信验证码
  //用户
  router.get('/user/register', UserCtrl.register)
  router.get('/user/login', UserCtrl.login)
  router.get('/user/info', UserCtrl.info)
  router.get('/user/conditions', UserCtrl.conditions) //用户发布过的
  router.get('/user/collects', UserCtrl.collects) // 用户收藏
  router.get('/user/fans', UserCtrl.fans) // 用户粉丝
  router.get('/user/attention/list', UserCtrl.attentions) // 用户关注列表
  router.get('/user/attention/add', UserCtrl.addAttention) // 用户关注
  //状态
  router.get('/condition/add', ConditionCtrl.add)
  router.get('/condition/list', ConditionCtrl.list)
  router.get('/condition/detail', ConditionCtrl.detail)
  router.get('/condition/collect', ConditionCtrl.collect)
  //评论
  router.get('/comment/add', CommentCtrl.add)
  router.get('/comment/list', CommentCtrl.list)
  router.get('/comment/detail', CommentCtrl.detail)
  router.get('/comment/vote', CommentCtrl.vote) //点赞

	return router
}

