'use strict'

var mongoose = require('mongoose')

var CitySchema = new mongoose.Schema({
  name: {
    unique: true,
    type: String,
    minlength: 2,
    maxlength: 10,
  },
  status: {
    type: Number,
    enum: [
      _global.ENABLE, 
      _global.DISABLE, 
    ],//1=启用 0=禁用
  },//状态
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

CitySchema.pre('save', function (next) {
  var now = Date.now()
  if (this.isNew) {
    this.meta.createAt = now
  }
  this.meta.updateAt = now
  next()
})

module.exports = mongoose.model('City', CitySchema)
