'use strict'

var xss = require('xss')
var _ = require('lodash')

exports.get = function(cxt, key, defaultVal) {
  var value = cxt.query !== undefined && cxt.query[key] !== undefined 
              ? xss(cxt.query[key]) 
              : (cxt.body !== undefined && cxt.body[key]!== undefined ? xss(cxt.body[key]): null)
  if(value !== null) {
    return value
  }
  if(defaultVal !== undefined) {
    return defaultVal 
  }
  return null
}

exports.all = function(cxt) {
  return _.merge(cxt.query, cxt.body)
}
