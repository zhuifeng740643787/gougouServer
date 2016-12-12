'use strict'
var config = require('../config/config')

exports.getImage = function(imageName, width, height){
  var width = width || 200
  var height = height || 200 
  return config.qiniu.imageUrl + imageName + '?imageView2/0/w/'+ width +'/h/' + height;
}

exports.getVideo = function(videoName){
  return config.qiniu.videoUrl + videoName;
}

exports.defaultAvatar = function() {
  return this.getImage('avatar', 200, 200)
}