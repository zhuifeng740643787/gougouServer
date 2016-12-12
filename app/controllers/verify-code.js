'usr strict'

var mongoose = require('mongoose')
var xss = require('xss')
var sms = require('../service/sms')
var UserEntity = require('../entity/user')
var utils = require('../common/utils')
var request = require('../common/request')
var response = require('../common/response')

var VerifyCode = mongoose.model('VerifyCode')

exports.image = function *(next) {
  var mobile = request.get(this, 'mobile')
  var operate = request.get(this, 'operate', 1) // 1 注册 2 登录
  if(!utils.checkMobile(mobile)) {
    return response.error(this, '手机号码格式不正确')
  }

  if(operate == 1 && (yield UserEntity.checkMobileExists(mobile))) {
    return response.error(this, '手机号码已被使用')
  }

  var captcha = utils.makeCaptcha()
  var params = {
    mobile: mobile,
    type: _global.VERIFY_CODE_TYPE_IMAGE,
    status: _global.ENABLE,//使用状态
    content: captcha.text,
  }
  console.log(captcha.text)
  var verifyCode = new VerifyCode(params)
  try{
    yield verifyCode.save()
  } catch(err) {
    console.log(err)
    return response.error(this, "获取失败")
  }
  delete captcha.text
  response.success(this, {captcha: captcha})
  yield next
}

exports.sms = function *(next) {
  var mobile = request.get(this, 'mobile')
  var captcha = request.get(this, 'captcha')
  if(!utils.checkMobile(mobile)) {
    return response.error(this, '手机号码格式不正确')
  }
  var verifyCode = yield VerifyCode.findOne({mobile: mobile}).sort({'meta.createAt': -1}).exec()
  console.log(verifyCode)
  if(!(verifyCode && verifyCode.status == _global.ENABLE && verifyCode.content == captcha)) {
    return response.error(this, '验证码错误')
  }
  verifyCode.status = _global.DISABLE
  var smsCode = new VerifyCode({
    mobile: mobile,
    type: _global.VERIFY_CODE_TYPE_SMS,
    status: _global.ENABLE,//使用状态
    content: utils.randomString(6,6,'numeric'),
  })

  //TODO 验证码发送规则控制
  //

  try{
    yield verifyCode.save()
    yield smsCode.save()
  } catch(err) {
    console.log(err)
    return response.error(this, "获取失败")
  }
  //发送短信
  // var msg = '您的验证码是 ' + verifyCode
  // try{
  //   sms.send(phoneNumber, msg)
  // } catch(e){
  //   console.log(e)
  //   this.body = {
  //     success: false,
  //     err: '短信服务异常'
  //   }
  //   return next
  // }
  response.success(this)
  yield next
}

