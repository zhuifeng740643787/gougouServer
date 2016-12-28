'use strict'
var Promise = require("bluebird");
var mongoose = require('mongoose')
var sleep = require('sleep')
var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;

function request(url) {
  return new Promise(function(resolve, reject){
    var xhr = new XMLHttpRequest()
    xhr.onload = function() {
      if(xhr.status == 200) {
        var data = JSON.parse(xhr.responseText)
        return resolve(data)
      }else{
        return reject(xhr.responseText)
      }
    }
    xhr.onerror = function() {
      return reject(xhr.responseText)
    }
    xhr.open("GET", url)
    xhr.setRequestHeader('Accept', 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8')
    xhr.setRequestHeader('User-Agent', 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/57.0.2926.0 Safari/537.36')
    xhr.setRequestHeader('Accept-Language', 'zh-CN,zh;q=0.8')
    xhr.setRequestHeader('Cache-Control', 'max-age=0')
    xhr.setRequestHeader('Upgrade-Insecure-Requests', '1')
    xhr.responseType = "json"
    xhr.send()
  })
}

function get(maxBehotTime, category) {
  var category = category ? category : '__all__' 
  var url = "http://www.toutiao.com/api/pc/feed/?category=" + category + "&utm_source=toutiao&widen=1&max_behot_time=" + maxBehotTime + "&max_behot_time_tmp=" + maxBehotTime + "&as=A1A5586621EDA8A&cp=58612D5A681A6E1"
  console.log('url: ', url)
  return request(url).then((ret) => {
    console.log(ret.next.max_behot_time)
    if(ret.message == 'success') {
      handle(ret.data)
      sleep.sleep(2)
      return get(ret.next.max_behot_time, category)
    }
    console.error('error message: ', ret)
    exit(url)
  }).catch(err => {
    console.log('error url: ',url)
    exit(err)
  })
}

function exit(err) {
  console.error('error: ', err)
  process.exit(0)
}

function handle(dataList) {
  dataList.forEach(function(item, index){
    !item.is_feed_ad && save(item)
  })
}

function save(item) {
  var Condition = mongoose.model('Condition')
  Condition.findOne({source: 'toutiao', 'toutiao.groupId': item.group_id}, function(err, doc){
    if(doc) {
      console.log('重复:', 'group_id=', item.group_id, 'title=', item.title)
      return
    }
    console.log('新:', 'group_id=', item.group_id, 'title=', item.title)
    var params = {
        source: 'toutiao',//来源 头条
        toutiao: {
          category: item.tag,
          categoryChinese: item.chinese_tag,
          imageUrl: item.image_url,//封面图
          isAd: false,
          title: item.title,
          behotTime: item.behot_time,
          hasGallery: item.has_gallery,
          gallaryImageCount: item.gallary_image_count | 0,
          groupId: item.group_id,
          sourceUrl: item.source_url,
          mediaName: item.source,
          mediaAvatarUrl: item.media_avatar_url,
          mediaUrl: item.media_url,
          videoDurationStr: item.tag_url == 'video' ? item.video_duration_str : ''
        },
        toutiaoOriginal: item,
        type: item.tag_url == 'video' ? _global.CONDITION_TYPE_VIDEO : _global.CONDITION_TYPE_IMAGE,
        commentNumber: item.comments_count,
    }
    var imageList = []
    if(item.image_list && item.image_list.length > 0) {
      item.image_list.forEach(function(r,i) {
        imageList.push({uri: r.url})
      })
    }
    params.toutiao.imageList = imageList
    var condition = new Condition(params)
    condition.save(function(err, doc) {
      console.log(doc._id)
    })
  })
}

exports.batch = function(category, maxBehotTime) {
  var category = category ? category : '__all__'
  var maxBehotTime = maxBehotTime ? maxBehotTime: 0
  get(maxBehotTime, category)

  // const categories = [
  //   { chineseName: '热点', name: 'news_hot' },
  //   { chineseName: '视频', name: 'video' },
  //   { chineseName: '社会', name: 'news_society' },
  //   { chineseName: '娱乐', name: 'news_entertainment' },
  //   { chineseName: '科技', name: 'news_tech' },
  //   { chineseName: '体育', name: 'news_sports' },
  //   { chineseName: '汽车', name: 'news_car' },
  //   { chineseName: '财经', name: 'news_finance' },
  //   { chineseName: '搞笑', name: 'funny' },
  //   { chineseName: '军事', name: 'news_military' },
  //   { chineseName: '国际', name: 'news_world' },
  //   { chineseName: '时尚', name: 'news_fashion' },
  //   { chineseName: '旅游', name: 'news_travel' },
  //   { chineseName: '探索', name: 'news_discovery' },
  //   { chineseName: '育儿', name: 'news_baby' },
  //   { chineseName: '养生', name: 'news_regimen' },
  //   { chineseName: '故事', name: 'news_story' },
  //   { chineseName: '美文', name: 'news_essay' },
  //   { chineseName: '游戏', name: 'news_game' },
  //   { chineseName: '历史', name: 'news_history' },
  //   { chineseName: '美食', name: 'news_food' }
  // ]
  // categories.forEach(function(r,i){
  //   console.log(r.name,i)
  //   get(maxBehotTime, r.name)
  //   sleep.sleep(2)
  // })
}














