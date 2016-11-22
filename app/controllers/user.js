'usr strict'

var mongoose = require('mongoose')
var xss = require('xss')
var User = mongoose.model('User')
var sms = require('../service/sms')
var uuid = require('uuid')
var utils = require('../common/utils')


//用户注册
exports.signup = function *(next) {
  var phoneNumber = this.query.phoneNumber


  var user = yield User.findOne({
    phoneNumber: phoneNumber
  }).exec()

  var verifyCode = sms.getCode()
  if (!user) {
    var accessToken = uuid.v4()
    var nickname = utils.randomString(20, 50)
    user = new User({
      phoneNumber: xss(phoneNumber),
      nickname: nickname,
      verifyCode: verifyCode,
      accessToken: accessToken
    })
  } else {
    user.verifyCode = verifyCode 
  }

  try {
    user = yield user.save()
  } catch (e) {
    this.body = {
      success: false
    }
    return next
  }
  console.log('验证码：' + verifyCode)
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



  this.body = {
    success: true
  }
  yield next
}
