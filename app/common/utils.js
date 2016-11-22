'use strict'
var randomstring = require('randomstring')
var file = require('./file')

exports.randomString = function(minLength, maxLength) {
  var length = Math.ceil(Math.random() * (maxLength - minLength)) + minLength;
  return randomstring.generate({
    length: length,
    charset: 'alphanumeric'
  })
}


exports.randomImage = function() {
  var fileName = Math.ceil(Math.random() * 15) + '.jpg';
  return file.getImage(fileName);
}

exports.randomVideo = function() {
  return file.getVideo('1.mp4');
}


