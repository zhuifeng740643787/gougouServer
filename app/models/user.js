'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserSchema = new mongoose.Schema({
  mobile: {
    unique: true,
    type: Number,
  },
  status: {
    type: Number,
    enum: [
      _global.ENABLE,
      _global.DISABLE
    ], //1=可用 0=不可用
  }, //状态 1=启用 0=禁用
  avatar: String, //头像
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City'
  },
  accessToken: String, //访问token
  nickname: String, //昵称
  gender: {
    type: Number,
    enum: [0, 1, 2], //0=未设置 1=男 2=女
  }, //性别
  age: {
    type: Number,
    max: 120,
    min: 0,
  }, //年龄
  desc: String, //简介
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

UserSchema.pre('save', function(next) {
  var now = Date.now()
  if (this.isNew) {
    this.meta.createAt = now
  }
  this.meta.updateAt = now
  next()
})

module.exports = mongoose.model('User', UserSchema)
