'use strict'

var mongoose = require('mongoose')

var ConditionTypeSchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
    maxlength: 6,
    minlength: 2,
  },
  status: {
    type: Number,
    enum: [
      _global.ENABLE,
      _global.DISABLE,
    ],
  },//状态 1=启用 0=禁用
  isHot: {
    type: Number,
    enum: [
      _global.HAD,
      _global.CANCEL,
    ],
  },//是否为hot
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

ConditionTypeSchema.pre('save', function (next) {
  var now = Date.now()
  if (this.isNew) {
    this.meta.createAt = now
  }
  this.meta.updateAt = now
  next()
})

module.exports = mongoose.model('ConditionType', ConditionTypeSchema)
