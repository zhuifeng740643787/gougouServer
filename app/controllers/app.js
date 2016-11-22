'usr strict'

var mongoose = require('mongoose')
var xss = require('xss')
var User = mongoose.model('User')
var Creations = mongoose.model('Creations')
var utils = require('../common/utils')
var file = require('../common/file')

exports.creations = function*(next) {
  var page = xss(this.query.page) || 1
  var take = xss(this.query.take) || 5
  var offset = (page - 1) * take
  var list = yield Creations.find({})
    .skip(offset)
    .limit(take)
    .sort({ 'meta.createAt': '-1' })
    .exec()

  this.body = {
    success: true,
    data: list
  }
  yield next
}

exports.add = function*(next) {
  var title = utils.randomString(20, 100)

  var params = {
    title: title,
    thumb: utils.randomImage(),
    video: utils.randomVideo(),
    userId: mongoose.Types.ObjectId("583292076dad870603731640"),
    votes: {
      total: 2,
      data: [{
        userId: mongoose.Types.ObjectId('5833b9617be1f114ade427b2'),
        createdAt: Date.now(),
      }, {
        userId: mongoose.Types.ObjectId('58329cf76dad870603731641'),
        createdAt: Date.now(),
      }, {
        userId: mongoose.Types.ObjectId('5833b5e521d31d1413576d67'),
        createdAt: Date.now(),
      }, ]
    }
  }
  var creations = new Creations(params)
  try {
    creations = yield creations.save()
  } catch (err) {
    console.log(err)
    this.body = {
      success: false,
      err: err
    }
    return false
  }
  this.body = {
    success: true,
    data: creations
  }
  yield next
}
