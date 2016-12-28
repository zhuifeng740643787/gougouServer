'usr strict'

var mongoose = require('mongoose')
var City = mongoose.model('City')
var request = require('../common/request')
var response = require('../common/response')


exports.list = function *(next) {
  var page = parseInt(request.get(this, 'page', 1))
  var search = request.get(this, 'search')
  var take = request.get(this, 'take', 20)
  var skip = (page - 1) * take
  var City = mongoose.model('City')
  var query = search ? {$or: [{name: {$regex: search}}, {desc: {$regex: search}}]} : {}
  var list = yield City.find(query)
                    .select('_id name desc')
                    .skip(skip)
                    .limit(take)
                    .sort({_id: 1}).exec()
  response.success(this, list)
  yield next
}