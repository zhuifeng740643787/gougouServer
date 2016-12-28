'use strict'

var mongoose = require('mongoose')
var Schema = mongoose.Schema
var CategorySchema = new Schema({
  name: {
    unique: true,
    type: String,
  },
  chineseName: String,
  status: {
    type: Number,
    enum: [
      _global.ENABLE,
      _global.DISABLE,
    ],
    default: _global.ENABLE,
  },//状态 1=启用 0=禁用
  isHot: {
    type: Number,
    enum: [
      _global.ENABLE,
      _global.DISABLE,
    ],
    default: _global.DISABLE
  },//是否为hot，小红点
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

CategorySchema.pre('save', function (next) {
  var now = Date.now()
  if (this.isNew) {
    this.meta.createAt = now
  }
  this.meta.updateAt = now
  next()
})

module.exports = mongoose.model('Category', CategorySchema)
