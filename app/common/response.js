'use strict'

exports.success = function (cxt, data, extras) {
  var ret = {}
  ret.success = true
  ret.data = data || {} 
  if(extras !== undefined) {
    ret.extras = extras
  }
  cxt.body = ret
  return true
}

exports.error = function (cxt, errorMsg, extras) {
  var ret = {}
  ret.success = false
  ret.message = errorMsg === undefined ? "error" : errorMsg
  if(extras !== undefined) {
    ret.extras = extras
  }
  cxt.body = ret
  return false
}