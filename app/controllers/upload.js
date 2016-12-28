'usr strict'

var mongoose = require('mongoose')
var xss = require('xss')
var sleep = require('sleep')
var User = mongoose.model('User')
var utils = require('../common/utils')
var request = require('../common/request')
var response = require('../common/response')

var qiniu = require('../service/qiniu')

exports.image = function * (next)
{
  var imageData = request.get(this, 'imageData', '')
  if(!imageData) {
    response.error('上传失败')
    return false
  }
  sleep.sleep(2)
  var that = this
  yield qiniu.uploadBase64Image(imageData).then((ret) => {
    response.success(that, {imgName: ret.key})
    return false
  }).catch((err) => {
    response.error(that, '上传失败')
    return true 
  })
  yield next
}

exports.audio = function * (next)
{
  response.success(this)
  yield next
}

exports.video = function * (next)
{
  response.success(this)
  yield next
}


