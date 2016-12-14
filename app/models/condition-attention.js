'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema

var UserAttentionSchema = new mongoose.Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  attentionedUserId: {
    type: Schema.Types.ObjectId,
    ref: 'User',
  },
  status: {
    type: Number,
    enum: [
      _global.HAD, 
      _global.CANCEL, 
    ],//1=已关注 0=取消关注
  },//关注状态
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

UserAttentionSchema.pre('save', function (next) {
  var now = Date.now()
  if (this.isNew) {
    this.meta.createAt = now
  }
  this.meta.updateAt = now
  next()
})

module.exports = mongoose.model('UserAttention', UserAttentionSchema)
