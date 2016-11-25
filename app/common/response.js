'use strict'

exports.success = function (cxt, data, extras) {
  var ret = {}
  ret.status = true
  ret.data = data === undefined ? {} : data
  extras === undefined ? (ret.extras = extras) : null
  cxt.body = ret
  return true
}

exports.error = function (cxt, errorMsg, extras) {
  var ret = {}
  ret.status = false
  ret.error = errorMsg === undefined ? "error" : errorMsg
  extras === undefined ? (ret.extras = extras) : null
  cxt.body = ret
  return false
}