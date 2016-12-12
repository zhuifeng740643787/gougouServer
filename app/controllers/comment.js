'usr strict'

var mongoose = require('mongoose')
var Condition = mongoose.model('Condition')
var request = require('../common/request')


exports.add = function *(next) {
  this.body = {
    success: true
  }
  yield next
}
exports.list = function *(next) {
  this.body = {
    success: true
  }
  yield next
}
exports.detail = function *(next) {
  this.body = {
    success: true
  }
  yield next
}
exports.vote = function *(next) {
  this.body = {
    success: true
  }
  yield next
}
