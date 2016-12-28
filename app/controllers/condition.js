'usr strict'

var mongoose = require('mongoose')
var Condition = mongoose.model('Condition')
var request = require('../common/request')
var response = require('../common/response')
var xss = require('xss')

exports.add = function *(next) {
  var title = request.get(this, 'title', '')
  var desc = request.get(this, 'desc', '')
  var images = request.get(this, 'images', [])
  var mobile = request.get(this, 'mobile', '')
  var cityId = request.get(this, 'cityId', 0)
  console.log(title,desc,images,mobile,cityId)
  var params = {
    title: title,
    desc: desc,
    images: images,
    mobile: mobile,
    userId: mongoose.Types.ObjectId(this.user._id),
  }
  if(cityId) {
    params.cityId = mongoose.Types.ObjectId(cityId)
  }
  var condition = new Condition(params)
  var saved = yield condition.save().then((ret) => {
    return true
  }).catch((err) => {
    console.error(err)
    return false
  })
  if(saved) {
    response.success(this)
  }else{
    response.error(this, '保存失败')
  }
  yield next
}
exports.list = function *(next) {

  var category = request.get(this, 'category')
  var source = request.get(this, 'source')
  var search = request.get(this, 'search')
  // {$and: [{source:'toutiao'},{$or: [{'toutiao.title':{$regex:'刘德华'}},{title:{$regex:'aa'}}]}]}
  var query = {}
  var conds = [{status: _global.ENABLE}]
  if(source == 'toutiao' && category) {
    conds.push({'toutiao.category': category})
  }
  if(search) {
   conds.push({$or: [{'toutiao.title':{$regex:search}},{title:{$regex:search}}]})
  }
  if(conds.length > 0) {
    query = {'$and': conds}
  }
  console.log(query)
  var page = request.get(this, 'page', 1)
  var take = request.get(this, 'take', 10)
  var sort = {'toutiao.beHotTime': -1}
  var list = yield Condition.find(query).skip((page-1)*take).limit(take).sort(sort).exec()
  var retData = []
  list.forEach(function(item,i) {
    retData.push({
      _id: item._id
    })
  })
  response.success(this, retData) 
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