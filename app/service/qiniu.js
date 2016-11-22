'use strict'

var qiniu = require("qiniu");
var config = require('../config/config')
  //需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY

exports.uploadImage = function(filePath, fileSaveKey, successHandler, errorHandler) {
  //要上传的空间
  var bucket = config.qiniu.imageBucket;
  //上传到七牛后保存的文件名
  var key = fileSaveKey;
  //生成上传 Token
  var token = uptoken(bucket, key);
  //要上传文件的本地路径
  var filePath = filePath;

  //调用uploadFile上传
  uploadFile(token, key, filePath);

  function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    return putPolicy.token();
  }

  //构造上传函数
  function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if (!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);
      } else {

        // 上传失败， 处理返回代码
        console.log(err);
      }
    });
  }
}
  //构建上传策略函数

exports.uploadVideo = function(filePath, fileSaveKey, successHandler, errorHandler) {
  //要上传的空间
  var bucket = config.qiniu.videoBucket

  //上传到七牛后保存的文件名
  var key = fileSaveKey

  //转码是使用的队列名称。 
  // var pipeline = 'video'//#设定自己账号下的pipleline

  //要进行转码的转码操作。 
  var fops = "avthumb/mp4/s/640x360/vb/1.25m"

  //可以对转码后的文件进行使用saveas参数自定义命名，当然也可以不指定文件会默认命名并保存在当间。
  // saveas_key = qiniu.util.urlsafeBase64Encode(目标Bucket_Name: 自定义文件key);
  // fops = fops + '|saveas/' + saveas_key;;

  //上传策略中设置pipeline以及fops
  function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key);
    putPolicy.persistentOps = fops;
    // putPolicy.persistentPipeline = pipleline;
    return putPolicy.token();
  }

  //生成上传 Token
  var token = uptoken(bucket, key);

  //要上传文件的本地路径
  var filePath = filePath

  //构造上传函数
  function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra();
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if (!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId);
      } else {
        // 上传失败， 处理返回代码
        console.log(err);
      }
    });
  }

  //调用uploadFile上传
  uploadFile(token, key, filePath);
}
