'use strict'
var randomstring = require('randomstring')
var file = require('./file')
var Canvas = require('canvas')

/*
  generate(options)
    length - the length of the random string. (default: 32) [OPTIONAL]
    readable - exclude poorly readable chars: 0OIl. (default: false) [OPTIONAL]
    charset - define the character set for the string. (default: 'alphanumeric') [OPTIONAL]
    alphanumeric - [0-9 a-z A-Z]
    alphabetic - [a-z A-Z]
    numeric - [0-9]
    hex - [0-9 a-f]
    custom - any given characters
    capitalization - define whether the output should be lowercase / uppercase only. (default: null) [OPTIONAL]
    lowercase
    uppercase
*/
exports.randomString = function(minLength, maxLength, charset) {
  var length = Math.ceil(Math.random() * (maxLength - minLength)) + minLength;
  return randomstring.generate({
    length: length,
    charset: charset || 'alphanumeric'
  })
}

exports.randomNumber = function(min, max) {
  return Math.ceil(Math.random() * (max - min)) + min;
}

exports.randomImage = function() {
  var fileName = Math.ceil(Math.random() * 15) + '.jpg';
  return file.getImage(fileName);
}

exports.randomVideo = function() {
  return file.getVideo('1.mp4');
}

exports.checkMobile = function(mobile) {
  if (!mobile) {
    return false
  }

  return /^1[\d]{10}$/.test(mobile)
}

exports.checkPassword = function(password) {
  if (!password) {
    return false
  }

  return /^\w{8,20}$/.test(password)
}

exports.makeCaptcha = function() {
  var that = this

  function randomColor() {
    return that.randomNumber(0, 255)
  }

  function randomOpacity() {
    return that.randomNumber(7, 10) / 10
  }

  function randomRotate() {
    return that.randomNumber(-10, 10) / 100
  }
  var strings = this.randomString(6, 6)
  var Image = Canvas.Image
  var imageWidth = 100
  var imageHeight = 40
  var canvas = new Canvas(imageWidth, imageHeight)
  var ctx = canvas.getContext('2d')

  ctx.fillStyle = 'rgba(' + randomColor() + ',' + randomColor() + ',' + randomColor() + ',' + randomOpacity() + ')'
  ctx.fillRect(0, 0, 100, 40)
  ctx.font = '20px serif'
  ctx.textAlign = 'center'
  ctx.rotate(randomRotate())
  ctx.fillStyle = 'rgba(' + randomColor() + ',' + randomColor() + ',' + randomColor() + ',1)'
  ctx.fillText(strings, 50, 30)

  var te = ctx.measureText(strings)
  ctx.strokeStyle = 'rgba(0,255,255,0.9)'
  ctx.beginPath()
  ctx.lineTo(10, 15)
  ctx.lineTo(20 + te.width, 23)
  ctx.stroke()
  return {
    text: strings,
    image: canvas.toDataURL(),
    imageWidth: imageWidth,
    imageHeight: imageHeight,
  }
}



