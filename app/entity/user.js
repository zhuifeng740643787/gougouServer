'usr strict'

var mongoose = require('mongoose')
var User = mongoose.model('User')
var UserStatistics = mongoose.model('UserStatistics')
var utils = require('../common/utils')
var file = require('../common/file')

module.exports = {
  checkMobileExists: function *(mobile) {
    var user = yield User.findOne({mobile: mobile}).exec()
    return user ? true : false
  },
  info: function *(id) {
    var idType = typeof(id)
    if(idType.toLowerCase() === 'string') {
      var user = yield User.findOne({_id: mongoose.Types.ObjectId(id)}).exec()
    } else {
      var user = id
    }
    if(!user || user.status != _global.ENABLE) {
      return false
    }
    var userStatistics = yield UserStatistics.findOne({userId: mongoose.Types.ObjectId(user._id)})
    return {
      mobile: user.mobile,
      avatar: user.avatar || file.defaultAvatar(),//头像
      city: user.city || 0,
      accessToken: user.accessToken,//访问token
      nickname: user.nickname || '',//昵称
      gender: user.gender || 0,//性别
      age: user.age || 0,//年龄
      desc: user.desc || '',//简介,
      attentionNumber: userStatistics.attentionNumber || 0,
      fansNumber: userStatistics.fansNumber || 0,
      collectConditionNumber: userStatistics.collectConditionNumber || 0,
    }
  }
}

