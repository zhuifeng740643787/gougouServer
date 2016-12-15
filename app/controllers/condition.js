'usr strict'

var mongoose = require('mongoose')
var Condition = mongoose.model('Condition')
var request = require('../common/request')
var response = require('../common/response')

exports.add = function *(next) {
  this.body = {
    success: true
  }
  yield next
}
exports.list = function *(next) {
  response.success(this, []) 
  yield next
}
exports.detail = function *(next) {
  this.body = {
    success: true
  }
  yield next
}
exports.collect = function *(next) {
  this.body = {
    success: true
  }
  yield next
}