'usr strict'

var mongoose = require('mongoose')
var xss = require('xss')
var User = mongoose.model('User')
var UserStatistics = mongoose.model('UserStatistics')
var VerifyCode = mongoose.model('VerifyCode')
var sms = require('../service/sms')

var utils = require('../common/utils')
var request = require('../common/request')
var response = require('../common/response')
var UserEntity = require('../entity/user')

exports.register = function*(next) {
  var mobile = request.get(this, 'mobile')
  var smsCode = request.get(this, 'code')
  var password = request.get(this, 'password')

  if (!utils.checkMobile(mobile) || !smsCode || !utils.checkPassword(password)) {
    return response.error(this, '信息填写有误')
  }

  var verifyCode = yield VerifyCode.findOne({
    mobile: mobile,
    type: _global.VERIFY_CODE_TYPE_SMS,
  }).sort({ 'meta.createAt': -1 }).exec()

  if (!(verifyCode && verifyCode.status == _global.ENABLE && verifyCode.content == smsCode)) {
    return response.error(this, '验证码有误')
  }
  verifyCode.status = _global.DISABLE
  if ((yield UserEntity.checkMobileExists(mobile))) {
    return response.error(this, '手机号已被使用')
  }
  var user = new User({
    mobile: mobile,
    status: _global.ENABLE,
    password: utils.makePassword(password),
    accessToken: utils.makeAccessToken(), //访问token
    nickname: utils.randomString(8,20), //访问token
  })
  try {
    yield verifyCode.save()
    user = yield user.save()
    var userStatistics = new UserStatistics({
      userId: mongoose.Types.ObjectId(user._id),
      attentionNumber: 0,//关注的个数
      fansNumber: 0,//粉丝个数
      collectConditionNumber: 0,//收藏的个数
    })
    yield userStatistics.save()
  } catch (err) {
    console.log(err)
    return response.error(this, '注册失败')
  }
  var userInfo = yield UserEntity.info(user)
  response.success(this, userInfo)
  yield next
}

exports.login = function*(next) {
  var userName = request.get(this, 'userName')
  var password = request.get(this, 'password')

  if (!utils.checkMobile(userName) || !utils.checkPassword(password)) {
    return response.error(this, '信息填写有误')
  }
  var user = yield User.findOne({
    mobile: userName,
    status: _global.ENABLE,
  }).sort({ 'meta.createAt': -1 }).exec()
  if(!user || user.password != utils.makePassword(password)) {
    return response.error(this, '用户名或密码错误')
  }
  var userInfo = yield UserEntity.info(user)
  response.success(this, userInfo)
  yield next
}
exports.info = function*(next) {
  var accessToken = request.get(this, 'accessToken')
  if(!accessToken) {
    return response.error(this, '访问失败')
  }
  var user = yield User.findOne({accessToken: accessToken}).exec()
  if(!user) {
    return response.error(this, '访问失败')
  }
  var userInfo = yield UserEntity.info(user)
  response.success(this, userInfo)
  yield next
}
exports.conditions = function*(next) {
  this.body = {
    success: true
  }
  yield next
}
exports.collects = function*(next) {
  this.body = {
    success: true
  }
  yield next
}
exports.fans = function*(next) {
  this.body = {
    success: true
  }
  yield next
}
exports.attentions = function*(next) {
  this.body = {
    success: true
  }
  yield next
}
exports.addAttention = function*(next) {
  this.body = {
    success: true
  }
  yield next
}
