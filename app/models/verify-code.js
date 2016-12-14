'use strict'

var mongoose = require('mongoose')

var VerifyCodeSchema = new mongoose.Schema({
  mobile: Number,
  type: {
    type: Number,
    enum: [
      _global.VERIFY_CODE_TYPE_IMAGE, 
      _global.VERIFY_CODE_TYPE_SMS
    ], //1=图形验证码 2=短信验证码
  },
  status: {
    type: Number,
    enum: [
      _global.ENABLE, 
      _global.DISABLE
    ],//1=可用 0=不可用
  },//使用状态
  sendStatus: {
    type: Number,
    enum: [
      _global.VERIFY_CODE_SENDSTATUS_UNSEND, 
      _global.VERIFY_CODE_SENDSTATUS_SUCCESS, 
      _global.VERIFY_CODE_SENDSTATUS_FAIL, 
    ],//0=未发送 1=发送成功 2=发送失败
  },//发送状态
  content: String,
  meta: {
    createAt: {
      type: Date,
      default: Date.now()
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})

VerifyCodeSchema.pre('save', function (next) {
  var now = Date.now()
  if (this.isNew) {
    this.meta.createAt = now
  }
  this.meta.updateAt = now
  next()
})

module.exports = mongoose.model('VerifyCode', VerifyCodeSchema)
