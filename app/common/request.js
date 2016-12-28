'use strict'

var xss = require('xss')
var _ = require('lodash')

exports.get = function(cxt, key, defaultVal) {
  var value = cxt.request.query[key] !== undefined 
              ? cxt.request.query[key] 
              : (cxt.request.body[key] !== undefined ? cxt.request.body[key] : null)
  if(value !== null) {
    return typeof(value) == 'string' ? xss(value.trim()) : value
  }
  if(defaultVal !== undefined) {
    return defaultVal 
  }
  return null
}

exports.all = function(cxt) {
  return _.merge(cxt.request.query, cxt.request.body)
}
