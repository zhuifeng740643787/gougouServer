'usr strict'

var mongoose = require('mongoose')
var xss = require('xss')
var User = mongoose.model('User')
var utils = require('../common/utils')
var request = require('../common/request')
var response = require('../common/response')

exports.checkAccessToken = function * (next)
{
  var accessToken = request.get(this, 'accessToken', '')
  console.log('accessToken: ', accessToken)
  if(!accessToken){
    response.error(this, '请先登录')
    return false
  }
  var user = yield User.findOne({accessToken: accessToken}).exec()
  if(!user || user.status != _global.ENABLE) {
    response.error(this, '请先登录')
    return false
  }
  this.user = user
  yield next
}