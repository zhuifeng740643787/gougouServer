'usr strict'

var mongoose = require('mongoose')
var Category = mongoose.model('Category')


exports.add = function() {
  var total = categories.length,
    result = [],
    error = []
  category = null

  function saveAll(callback) {
    category = new Category(categories.shift())
    category.save(function(err, doc) {
      if (err) {
        error.push(err)
      } else {
        result.push(doc)
      }
      if (--total) {
        saveAll(callback)
      } else {
        callback()
      }
    })
  }
  saveAll(function() {
    console.log(result.length, error.length)
    if (error.length > 0) {
      console.log('error:', error)
    }
    process.exit(0)
  })
}

const categories = [
  { chineseName: '热点', name: 'news_hot' },
  { chineseName: '视频', name: 'video' },
  { chineseName: '图片', name: 'news_image' },
  { chineseName: '段子', name: 'essay_joke' },
  { chineseName: '社会', name: 'news_society' },
  { chineseName: '娱乐', name: 'news_entertainment' },
  { chineseName: '科技', name: 'news_tech' },
  { chineseName: '体育', name: 'news_sports' },
  { chineseName: '汽车', name: 'news_car' },
  { chineseName: '财经', name: 'news_finance' },
  { chineseName: '搞笑', name: 'funny' },
  { chineseName: '军事', name: 'news_military' },
  { chineseName: '国际', name: 'news_world' },
  { chineseName: '时尚', name: 'news_fashion' },
  { chineseName: '旅游', name: 'news_travel' },
  { chineseName: '探索', name: 'news_discovery' },
  { chineseName: '育儿', name: 'news_baby' },
  { chineseName: '养生', name: 'news_regimen' },
  { chineseName: '故事', name: 'news_story' },
  { chineseName: '美文', name: 'news_essay' },
  { chineseName: '游戏', name: 'news_game' },
  { chineseName: '历史', name: 'news_history' },
  { chineseName: '美食', name: 'news_food' }
]
