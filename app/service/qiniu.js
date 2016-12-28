'use strict'

var qiniu = require("qiniu")
var md5 = require('md5')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest
var config = require('../config/config')
  //需要填写你的 Access Key 和 Secret Key
qiniu.conf.ACCESS_KEY = config.qiniu.ACCESS_KEY
qiniu.conf.SECRET_KEY = config.qiniu.SECRET_KEY

function uptoken(bucket, key) {
  var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key)
  return putPolicy.token()
}

// exports.uploadImageBase64Test = function(imageBase64Data, imageName, successHandler, errorHandler) {
//   //要上传的空间
//   var bucket = config.qiniu.imageBucket
//   //上传到七牛后保存的文件名
//   var key = imageName
//   //生成上传 Token
//   var token = uptoken(bucket, key)
//   console.log('UpToken:'+token)
//   var body = new FormData()
//   body.append('key', key)
//   body.append('token', token)
//   body.append('file', new Buffer(imageBase64Data, 'base64'))


//   var url = qiniu.conf.UP_HOST
//   var xhr = new XMLHttpRequest()
//   xhr.onload=function(){
//     // 200 上传成功。
//     // 400 请求报文格式错误，报文构造不正确或者没有完整发送。
//     // 401 上传凭证无效。
//     // 413 上传内容长度大于 fsizeLimit中指定的长度限制。
//     // 579 回调业务服务器失败。
//     // 599 服务端操作失败。 如遇此错误，请将完整错误信息（包括所有HTTP响应头部）通过邮件发送给我们。
//     // 614 目标资源已存在。
//     console.log(xhr)
//     if (xhr.status == 200){
//       successHandler && successHandler()
//     } else { 
//       console.error('err', xhr)
//       errorHandler && errorHandler(xhr.responseText)
//     }
//   }
//   xhr.onreadystatechange=function(){
//     console.log('--------', xhr)
//   }
//   xhr.open("POST", url, true)

//   xhr.send(body)

// }

exports.uploadBase64Image = function(fileBase64Data) {
  return new Promise(function(resolve, reject) {
    //要上传的空间
    var bucket = config.qiniu.imageBucket
    //上传到七牛后保存的文件名
    var key = md5(fileBase64Data)
    //生成上传 Token
    var token = uptoken(bucket, key)
    //要上传文件的本地路径
    var body = new Buffer(fileBase64Data, 'base64')

    //调用uploadFile上传
    var extra = new qiniu.io.PutExtra()
    qiniu.io.put(token, key, body, extra, function(err, ret) {
      if(err) {
        console.error('upload fail: ' + err)
        return reject(err)
      }
      return resolve(ret)
    })
  })
}

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
  // saveas_key = qiniu.util.urlsafeBase64Encode(目标Bucket_Name: 自定义文件key)
  // fops = fops + '|saveas/' + saveas_key

  //上传策略中设置pipeline以及fops
  function uptoken(bucket, key) {
    var putPolicy = new qiniu.rs.PutPolicy(bucket + ":" + key)
    putPolicy.persistentOps = fops
    // putPolicy.persistentPipeline = pipleline
    return putPolicy.token()
  }

  //生成上传 Token
  var token = uptoken(bucket, key)

  //要上传文件的本地路径
  var filePath = filePath

  //构造上传函数
  function uploadFile(uptoken, key, localFile) {
    var extra = new qiniu.io.PutExtra()
    qiniu.io.putFile(uptoken, key, localFile, extra, function(err, ret) {
      if (!err) {
        // 上传成功， 处理返回值
        console.log(ret.hash, ret.key, ret.persistentId)
        successHandler && successHandler()
      } else {
        errorHandler && errorHandler(err)
        // 上传失败， 处理返回代码
        console.log(err)
      }
    })
  }

  //调用uploadFile上传
  uploadFile(token, key, filePath)
}
