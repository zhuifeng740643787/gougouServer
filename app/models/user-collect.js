'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserCollectSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  conditionId: {
    type: Schema.Types.ObjectId,
    ref: 'Condition',
  },
  status: {
    type: Number,
    enum: [
      _global.HAD, 
      _global.CANCEL,
    ],//1=已收藏 0=取消收藏
  },//收藏状态
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

UserCollectSchema.pre('save', function (next) {
  var now = Date.now()
  if (this.isNew) {
    this.meta.createAt = now
  }
  this.meta.updateAt = now
  next()
})

module.exports = mongoose.model('UserCollect', UserCollectSchema)
