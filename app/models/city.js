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
  if (!this.name) {
    this.meta.updateAt = Date.now()
  }
  next()
})

module.exports = mongoose.model('City', CitySchema)
