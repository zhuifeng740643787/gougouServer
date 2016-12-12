'usr strict'

var mongoose = require('mongoose')
var xss = require('xss')
var User = mongoose.model('User')
var Creations = mongoose.model('Creations')
var Comment = mongoose.model('Comment')
var utils = require('../common/utils')
var file = require('../common/file')
var request = require('../common/request')
var response = require('../common/response')

exports.commentAdd = function * (next)
{
  var creationId = request.get(this, 'creationId')
  try {
    var creation = yield Creations.findOne({_id: creationId}).exec()
  } catch (err) {
    response.error(this, "视频ID错误")
    return false
  }

  var title = utils.randomString(20, 100)

  var params = {
    creationId: mongoose.Types.ObjectId(creationId),
    comment: {
      content: utils.randomString(20, 100),
    },
    userId: mongoose.Types.ObjectId("583292076dad870603731640"),
  }
  var comment = new Comment(params)
  try {
    comment = yield comment.save()
  } catch (err) {
    console.log(err)
    response.error(this, "评论失败")
    return false
  }
  response.success(this)
  yield next
}

exports.comments = function * (next)
{
  var page = parseInt(request.get(this, 'page', 1))
  var take = parseInt(request.get(this, 'take', 5))
  var offset = (page - 1) * take
  var sort = {'meta.createAt': -1}
  var creationId = request.get(this, 'creationId', 0)
  try{
    var list = yield Comment.find({creationId: creationId})
                .skip(offset)
                .limit(take)
                .sort(sort)
                .populate('userId', 'phoneNumber avatar')
                .exec()
  }catch(error){
    console.log(error)
    response.error(this, '加载失败')
    return false
  }
  response.success(this, list)
  yield next
}

exports.creations = function * (next)
{
  var page = parseInt(request.get(this,'page', 1))
  var take = parseInt(request.get(this,'take', 5))
  var offset = (page - 1) * take
  var sort = {'meta.createAt': -1}
  var list = yield Creations.find({})
    .skip(offset)
    .limit(take)
    .sort(sort)
    .exec()
  var total = yield Creations.count({}).exec()
  this.body = {
    success: true,
    data: list,
    total: total
  }
  yield next
}

exports.add = function * (next)
{
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
      },]
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
