'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var ConditionSchema = new Schema({
  title: {
    type: String,
    index: true,
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: Number,
    enum: [
      _global.ENABLE, 
      _global.DISABLE
    ],
  },//状态 1=启用 0=禁用
  type: {
    type: Number,
    enum: [
      _global.CONDITION_TYPE_IMAGE,
      _global.CONDITION_TYPE_VIDEO,
      _global.CONDITION_TYPE_AUDIO,
    ],
  }, //类型 1=图片 2=视频 3=音频
  commentNumber: Number,//评论个数
  images: [
    {
      md5: String,
      width: Number,
      height: Number,
    }
  ],
  city: {
    type: Schema.Types.ObjectId,
    ref: 'City',
  },
  video: {
    md5: String,
    duration: Number,//时长（秒）
  },
  audio: {
    md5: String,
    duration: Number,//时长（秒）
  },
  meta: {
    createAt: {
      type: Date,
      default: Date.now(),
    },
    updateAt: {
      type: Date,
      default: Date.now()
    }
  }
})
ConditionSchema.index({ "meta.createAt": -1 })

ConditionSchema.pre('save', function(next) {
  var now = Date.now()
  if (this.isNew) {
    this.meta.createAt = now
  }
  this.meta.updateAt = now
  next()
})

module.exports = mongoose.model('Condition', ConditionSchema)
